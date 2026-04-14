import { useEffect, useState, useCallback } from 'react';
import {
  getLiveMatches,
  getRecentMatches,
  getUpcomingMatches,
  getNewsList,
  getSeriesList,
  getSeriesArchives,
  getRankings,
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

/** Live + recent + upcoming matches for the home screen */
export function useHomeMatches() {
  return useAsync(async () => {
    const [liveRes, recentRes, upcomingRes] = await Promise.all([
      getLiveMatches().catch(() => ({ typeMatches: [] })),
      getRecentMatches().catch(() => ({ typeMatches: [] })),
      getUpcomingMatches().catch(() => ({ typeMatches: [] })),
    ]);
    return {
      live: extractMatches(liveRes as any),
      recent: extractMatches(recentRes as any),
      upcoming: extractMatches(upcomingRes as any),
    };
  }, { live: [] as MatchData[], recent: [] as MatchData[], upcoming: [] as MatchData[] });
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
    };
  }, { TEST: [], ODI: [], T20: [] } as Record<string, any[]>);
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
    // Only return truly finished series
    return groups.flatMap(g => g.series).filter(s => Number(s.endDt) < now);
  }, [] as SeriesItem[]);
}
