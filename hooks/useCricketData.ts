import { useEffect, useState, useCallback } from 'react';
import {
  getLiveMatches,
  getRecentMatches,
  getUpcomingMatches,
  getNewsList,
  getSeriesList,
  getSeriesArchives,
  getRankings,
  getSeriesInfo,
  getSeriesSquads,
  getSquadPlayers,
} from '../services/api';
import {
  extractMatches,
  extractStories,
  type MatchData,
  type Story,
  type SeriesGroup,
  type SeriesItem,
} from '../services/types';

type AsyncState<T> = {
  data: T;
  loading: boolean;
  error: string | null;
  refresh: () => void;
};

function useAsync<T>(fetcher: () => Promise<T>, initial: T): AsyncState<T> {
  const [data, setData] = useState<T>(initial);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(() => {
    setLoading(true);
    setError(null);
    fetcher()
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    run();
  }, [run]);

  return { data, loading, error, refresh: run };
}

// ─── Series-grouped type ─────────────────────────────────

export type SeriesMatchGroup = {
  seriesId: number;
  seriesName: string;
  matches: MatchData[];
};

function groupBySeries(matches: MatchData[]): SeriesMatchGroup[] {
  const map = new Map<number, SeriesMatchGroup>();
  for (const m of matches) {
    const sid = m.matchInfo.seriesId;
    if (!map.has(sid)) {
      map.set(sid, {
        seriesId: sid,
        seriesName: m.matchInfo.seriesName,
        matches: [],
      });
    }
    map.get(sid)!.matches.push(m);
  }
  return Array.from(map.values());
}

// ─── Hooks ───────────────────────────────────────────────

type HomeData = {
  live: MatchData[];
  upcoming: MatchData[];
  recent: MatchData[];
  seriesGroups: SeriesMatchGroup[];
};

/** Live + recent + upcoming matches for the home screen */
export function useHomeMatches() {
  return useAsync(async () => {
    const [liveRes, recentRes, upcomingRes] = await Promise.all([
      getLiveMatches().catch(() => ({ typeMatches: [] })),
      getRecentMatches().catch(() => ({ typeMatches: [] })),
      getUpcomingMatches().catch(() => ({ typeMatches: [] })),
    ]);

    const live = extractMatches(liveRes as any);
    const recent = extractMatches(recentRes as any);
    const upcoming = extractMatches(upcomingRes as any);

    // Combine live + upcoming and group by series
    const all = [...live, ...upcoming];
    const seriesGroups = groupBySeries(all);

    return { live, recent, upcoming, seriesGroups };
  }, { live: [], recent: [], upcoming: [], seriesGroups: [] } as HomeData);
}

/** Top news stories */
export function useNews(limit = 5) {
  return useAsync(async () => {
    const res = await getNewsList();
    return extractStories(res as any).slice(0, limit);
  }, [] as Story[]);
}

/** Team rankings by format */
export function useTeamRankings() {
  return useAsync(async () => {
    const [testRes, odiRes, t20Res] = await Promise.all([
      getRankings('teams', 'test').catch(() => ({ rank: [] })),
      getRankings('teams', 'odi').catch(() => ({ rank: [] })),
      getRankings('teams', 't20').catch(() => ({ rank: [] })),
    ]);
    return {
      TEST: (testRes as any).rank ?? [],
      ODI: (odiRes as any).rank ?? [],
      T20: (t20Res as any).rank ?? [],
    } as { TEST: any[]; ODI: any[]; T20: any[] };
  }, { TEST: [], ODI: [], T20: [] } as { TEST: any[]; ODI: any[]; T20: any[] });
}

/** League series list (ongoing + upcoming) */
export function useLeagueSeries() {
  return useAsync(async () => {
    const res: any = await getSeriesList('league');
    return (res.seriesMapProto ?? []) as SeriesGroup[];
  }, [] as SeriesGroup[]);
}

/** Finished league series (archives) */
export function useFinishedSeries() {
  return useAsync(async () => {
    const res: any = await getSeriesArchives('league');
    const groups = (res.seriesMapProto ?? []) as SeriesGroup[];
    const now = Date.now();
    return groups.flatMap(g => g.series).filter(s => Number(s.endDt) < now);
  }, [] as SeriesItem[]);
}

// ─── Tournament Detail hooks ─────────────────────────────

export type SeriesMatchDetail = {
  date: string;
  matches: MatchData[];
};

/** Fetch all matches for a series, grouped by date */
export function useSeriesMatches(seriesId: number) {
  return useAsync(async () => {
    const res: any = await getSeriesInfo(seriesId);
    const details: any[] = res.matchDetails ?? [];
    const groups: SeriesMatchDetail[] = [];

    for (const item of details) {
      const map = item.matchDetailsMap;
      if (!map?.match) continue;
      groups.push({
        date: map.key ?? '',
        matches: (map.match ?? []).map((m: any) => ({
          matchInfo: {
            matchId: m.matchInfo?.matchId ?? 0,
            seriesId: m.matchInfo?.seriesId ?? seriesId,
            seriesName: m.matchInfo?.seriesName ?? '',
            matchDesc: m.matchInfo?.matchDesc ?? '',
            matchFormat: m.matchInfo?.matchFormat ?? '',
            startDate: m.matchInfo?.startDate ?? '',
            endDate: m.matchInfo?.endDate ?? '',
            state: m.matchInfo?.state ?? '',
            status: m.matchInfo?.status ?? '',
            stateTitle: m.matchInfo?.stateTitle ?? '',
            team1: m.matchInfo?.team1 ?? {},
            team2: m.matchInfo?.team2 ?? {},
            venueInfo: m.matchInfo?.venueInfo ?? {},
            currBatTeamId: m.matchInfo?.currBatTeamId,
            isTimeAnnounced: m.matchInfo?.isTimeAnnounced,
          },
          matchScore: m.matchScore,
        })),
      });
    }
    return groups;
  }, [] as SeriesMatchDetail[]);
}

export type SquadInfo = {
  squadId: number;
  teamName: string;
  imageId: number;
  teamId: number;
};

/** Fetch squads list for a series */
export function useSeriesSquads(seriesId: number) {
  return useAsync(async () => {
    const res: any = await getSeriesSquads(seriesId);
    const squads: SquadInfo[] = (res.squads ?? [])
      .filter((s: any) => s.squadId && !s.isHeader)
      .map((s: any) => ({
        squadId: s.squadId,
        teamName: s.squadType ?? '',
        imageId: s.imageId ?? 0,
        teamId: s.teamId ?? 0,
      }));
    return squads;
  }, [] as SquadInfo[]);
}

export type PlayerInfo = {
  id: string;
  name: string;
  role: string;
  imageId: number;
  isCaptain: boolean;
  isKeeper: boolean;
  isHeader: boolean;
};

/** Fetch players for a specific squad */
export function useSquadPlayers(seriesId: number, squadId: number) {
  return useAsync(async () => {
    if (!squadId) return [];
    const res: any = await getSquadPlayers(seriesId, squadId);
    return ((res.player ?? []) as any[]).map((p: any) => ({
      id: p.id ?? '',
      name: p.name ?? '',
      role: p.role ?? '',
      imageId: p.imageId ?? 0,
      isCaptain: p.captain ?? false,
      isKeeper: p.keeper ?? false,
      isHeader: p.isHeader ?? false,
    })) as PlayerInfo[];
  }, [] as PlayerInfo[]);
}
