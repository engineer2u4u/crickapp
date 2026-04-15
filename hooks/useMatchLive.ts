import { useState, useEffect, useRef, useCallback } from 'react';
import {
  getMatchInfo,
  getMatchScorecard,
  getMatchCommentary,
} from '../services/api';

const POLL_INTERVAL = 30_000; // 30 seconds

// ─── Response types (mapped from Cricbuzz API) ───────────

export type LiveMatchInfo = {
  matchDescription: string;
  matchFormat: string;
  status: string;
  state: string;
  team1: { name: string; shortName: string };
  team2: { name: string; shortName: string };
  venue: string;
  city: string;
  toss: string;
  umpires: string;
  thirdUmpire: string;
  referee: string;
};

export type LiveBatter = {
  name: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: string;
  isNotOut: boolean;
  dismissal: string;
};

export type LiveBowler = {
  name: string;
  overs: string;
  maidens: number;
  runs: number;
  wickets: number;
  economy: string;
};

export type LiveFOW = {
  score: string;
  over: string;
  batter: string;
};

export type LiveInnings = {
  batTeamName: string;
  batTeamShortName: string;
  bowlTeamName: string;
  bowlTeamShortName: string;
  score: number;
  wickets: number;
  overs: number;
  runRate: string;
  batters: LiveBatter[];
  bowlers: LiveBowler[];
  fallOfWickets: LiveFOW[];
  partnerships: { runs: number; balls: number; bat1: string; bat2: string }[];
  isDeclared: boolean;
  isFollowOn: boolean;
};

export type LiveCommentaryBall = {
  ball: string;
  bowler: string;
  batter: string;
  result: string;
  detail: string;
  type: 'four' | 'six' | 'wicket' | 'dot' | 'run' | 'wide' | 'noball';
};

export type LiveOver = {
  over: number;
  summary: string;
  totalScore: string;
  balls: LiveCommentaryBall[];
};

// ─── Parsers ─────────────────────────────────────────────

function parseMatchInfo(raw: any): LiveMatchInfo | null {
  const info = raw?.matchInfo ?? raw;
  if (!info?.team1) return null;
  const venue = info.venueInfo ?? info.venueinfo;
  return {
    matchDescription: info.matchDesc ?? info.matchdesc ?? '',
    matchFormat: info.matchFormat ?? info.matchformat ?? '',
    status: info.status ?? '',
    state: info.state ?? '',
    team1: { name: info.team1?.teamName ?? info.team1?.teamname ?? '', shortName: info.team1?.teamSName ?? info.team1?.teamsname ?? '' },
    team2: { name: info.team2?.teamName ?? info.team2?.teamname ?? '', shortName: info.team2?.teamSName ?? info.team2?.teamsname ?? '' },
    venue: venue?.ground ?? '',
    city: venue?.city ?? '',
    toss: info.tossResults
      ? `${info.tossResults.tossWinnerName ?? ''} won the toss and elected to ${info.tossResults.decision ?? 'bat'}`
      : (info.tossstatus ?? ''),
    umpires: (info.umpire1?.name && info.umpire2?.name)
      ? `${info.umpire1.name}, ${info.umpire2.name}`
      : '',
    thirdUmpire: info.umpire3?.name ?? '',
    referee: info.referee?.name ?? '',
  };
}

function parseBatter(raw: any): LiveBatter {
  return {
    name: raw.batName ?? '',
    runs: raw.runs ?? 0,
    balls: raw.balls ?? 0,
    fours: raw.fours ?? 0,
    sixes: raw.sixes ?? 0,
    strikeRate: raw.strikeRate ?? '0.00',
    isNotOut: raw.outDec === 'not out' || raw.wicketCode === undefined,
    dismissal: raw.outDec && raw.outDec !== 'not out' ? raw.outDec : '',
  };
}

function parseBowler(raw: any): LiveBowler {
  return {
    name: raw.bowlName ?? '',
    overs: raw.overs ?? '0',
    maidens: raw.maidens ?? 0,
    runs: raw.runs ?? 0,
    wickets: raw.wickets ?? 0,
    economy: raw.economy ?? '0.00',
  };
}

function parseInnings(scoreCard: any[]): LiveInnings[] {
  if (!Array.isArray(scoreCard)) return [];
  return scoreCard.map((inn: any) => {
    const batData = inn.batTeamDetails ?? {};
    const bowlData = inn.bowlTeamDetails ?? {};
    const scoreDetails = inn.scoreDetails ?? {};
    const wicketsMap = inn.wicketsData ?? {};
    const partnershipsMap = inn.partnershipsData ?? {};

    const batters: LiveBatter[] = Object.values(batData.batsmenData ?? {}).map(parseBatter);
    const bowlers: LiveBowler[] = Object.values(bowlData.bowlersData ?? {}).map(parseBowler);

    const fallOfWickets: LiveFOW[] = Object.values(wicketsMap)
      .map((w: any) => ({
        score: `${w.wktRuns ?? 0}/${w.wktNbr ?? 0}`,
        over: String(w.wktOver ?? ''),
        batter: w.batName ?? '',
      }));

    const partnerships = Object.values(partnershipsMap)
      .map((p: any) => ({
        runs: p.totalRuns ?? 0,
        balls: p.totalBalls ?? 0,
        bat1: p.bat1Name ?? '',
        bat2: p.bat2Name ?? '',
      }));

    return {
      batTeamName: batData.batTeamName ?? '',
      batTeamShortName: batData.batTeamShortName ?? '',
      bowlTeamName: bowlData.bowlTeamName ?? '',
      bowlTeamShortName: bowlData.bowlTeamShortName ?? '',
      score: scoreDetails.runs ?? 0,
      wickets: scoreDetails.wickets ?? 0,
      overs: scoreDetails.overs ?? 0,
      runRate: scoreDetails.runRate ?? '0.00',
      batters,
      bowlers,
      fallOfWickets,
      partnerships,
      isDeclared: scoreDetails.isDeclared ?? false,
      isFollowOn: scoreDetails.isFollowOn ?? false,
    };
  });
}

function classifyBallEvent(event: string): LiveCommentaryBall['type'] {
  const e = (event ?? '').toLowerCase();
  if (e.includes('four') || e === 'four') return 'four';
  if (e.includes('six') || e === 'six') return 'six';
  if (e.includes('wicket') || e === 'wicket') return 'wicket';
  if (e.includes('wide')) return 'wide';
  if (e.includes('noball') || e.includes('no ball') || e.includes('no-ball')) return 'noball';
  return 'run';
}

function parseCommentary(raw: any): { overs: LiveOver[]; crr: string; rrr: string } {
  const commList = raw?.commentaryList ?? [];
  const miniscore = raw?.miniscore ?? {};

  const crr = String(miniscore.currentRunRate ?? miniscore.crr ?? '');
  const rrr = String(miniscore.requiredRunRate ?? miniscore.rrr ?? '');

  const oversMap = new Map<number, LiveCommentaryBall[]>();
  const overScores = new Map<number, string>();

  for (const c of commList) {
    if (!c.overNumber && c.overNumber !== 0) continue;
    const overNum = Math.floor(Number(c.overNumber));
    if (!oversMap.has(overNum)) {
      oversMap.set(overNum, []);
    }

    const result =
      c.event === 'FOUR'
        ? 'FOUR'
        : c.event === 'SIX'
          ? 'SIX'
          : c.event === 'WICKET'
            ? 'WICKET'
            : `${c.runs ?? 0} run${(c.runs ?? 0) !== 1 ? 's' : ''}`;

    oversMap.get(overNum)!.push({
      ball: String(c.overNumber ?? ''),
      bowler: c.bowlerNames ?? '',
      batter: c.batStrikerNames ?? '',
      result,
      detail: (c.commText ?? '').replace(/<[^>]*>/g, ''),
      type: c.runs === 0 && !c.event ? 'dot' : classifyBallEvent(c.event ?? (c.runs > 0 ? 'run' : 'dot')),
    });

    if (c.overSeparator) {
      overScores.set(overNum, `${c.overSeparator.score ?? ''}/${c.overSeparator.wickets ?? ''}`);
    }
  }

  const overs: LiveOver[] = Array.from(oversMap.entries())
    .sort((a, b) => b[0] - a[0])
    .map(([overNum, balls]) => {
      const totalRuns = balls.reduce((sum, b) => {
        const n = parseInt(b.result, 10);
        return sum + (isNaN(n) ? (b.type === 'four' ? 4 : b.type === 'six' ? 6 : 0) : n);
      }, 0);
      const wicketCount = balls.filter((b) => b.type === 'wicket').length;

      return {
        over: overNum + 1,
        summary: `${totalRuns} Runs | ${wicketCount} Wicket${wicketCount !== 1 ? 's' : ''}`,
        totalScore: overScores.get(overNum) ?? '',
        balls,
      };
    });

  return { overs, crr, rrr };
}

// ─── Hook: Match Data (auto-fetches info + scorecard on mount) ────

export type MatchDataState = {
  matchInfo: LiveMatchInfo | null;
  innings: LiveInnings[];
  loading: boolean;
  error: string | null;
};

export function useMatchData(matchId: number): MatchDataState {
  const [matchInfo, setMatchInfo] = useState<LiveMatchInfo | null>(null);
  const [innings, setInnings] = useState<LiveInnings[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!matchId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    Promise.all([
      getMatchInfo(matchId).catch(() => null),
      getMatchScorecard(matchId).catch(() => null),
    ])
      .then(([infoRes, scorecardRes]) => {
        setMatchInfo(parseMatchInfo(infoRes));
        setInnings(parseInnings((scorecardRes as any)?.scoreCard));
        setError(null);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [matchId]);

  return { matchInfo, innings, loading, error };
}

// ─── Hook: Commentary (Go Live for polling) ──────────────

export type CommentaryLiveState = {
  isLive: boolean;
  loading: boolean;
  error: string | null;
  commentary: LiveOver[];
  currentRunRate: string;
  requiredRunRate: string;
  goLive: () => void;
  stopLive: () => void;
};

export function useCommentaryLive(matchId: number): CommentaryLiveState {
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [commentary, setCommentary] = useState<LiveOver[]>([]);
  const [currentRunRate, setCurrentRunRate] = useState('');
  const [requiredRunRate, setRequiredRunRate] = useState('');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchCommentary = useCallback(async () => {
    if (!matchId) return;
    try {
      const res = await getMatchCommentary(matchId);
      const { overs, crr, rrr } = parseCommentary(res);
      setCommentary(overs);
      setCurrentRunRate(crr);
      setRequiredRunRate(rrr);
      setError(null);
    } catch (e: any) {
      setError(e.message ?? 'Failed to fetch commentary');
    }
  }, [matchId]);

  const goLive = useCallback(() => {
    setIsLive(true);
    setLoading(true);
    fetchCommentary().finally(() => setLoading(false));
  }, [fetchCommentary]);

  const stopLive = useCallback(() => {
    setIsLive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isLive) {
      intervalRef.current = setInterval(fetchCommentary, POLL_INTERVAL);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isLive, fetchCommentary]);

  return { isLive, loading, error, commentary, currentRunRate, requiredRunRate, goLive, stopLive };
}
