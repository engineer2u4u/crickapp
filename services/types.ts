// ─── Match Types ─────────────────────────────────────────

export type TeamInfo = {
  teamId: number;
  teamName: string;
  teamSName: string;
  imageId: number;
};

export type InningsScore = {
  inningsId: number;
  runs: number;
  wickets: number;
  overs: number;
  isDeclared?: boolean;
};

export type TeamScore = {
  inngs1?: InningsScore;
  inngs2?: InningsScore;
};

export type VenueInfo = {
  id: number;
  ground: string;
  city: string;
  timezone: string;
};

export type MatchInfo = {
  matchId: number;
  seriesId: number;
  seriesName: string;
  matchDesc: string;
  matchFormat: string;
  startDate: string;
  endDate: string;
  state: string;
  status: string;
  stateTitle: string;
  team1: TeamInfo;
  team2: TeamInfo;
  venueInfo: VenueInfo;
  currBatTeamId?: number;
  isTimeAnnounced?: boolean;
};

export type MatchData = {
  matchInfo: MatchInfo;
  matchScore?: {
    team1Score?: TeamScore;
    team2Score?: TeamScore;
  };
};

export type SeriesWrapper = {
  seriesId: number;
  seriesName: string;
  matches: MatchData[];
};

export type TypeMatch = {
  matchType: string;
  seriesMatches: { seriesAdWrapper?: SeriesWrapper }[];
};

export type MatchesResponse = {
  typeMatches: TypeMatch[];
};

// ─── Series Types ────────────────────────────────────────

export type SeriesItem = {
  id: number;
  name: string;
  startDt: string;
  endDt: string;
};

export type SeriesGroup = {
  date: string;
  series: SeriesItem[];
};

export type SeriesListResponse = {
  seriesMapProto: SeriesGroup[];
};

// ─── News Types ──────────────────────────────────────────

export type Story = {
  id: number;
  hline: string;
  intro: string;
  pubTime: string;
  source: string;
  storyType: string;
  context: string;
  imageId: number;
  coverImage?: { id: string; caption: string; source: string };
};

export type StoryListItem = {
  story?: Story;
  ad?: any;
};

// ─── Helpers ─────────────────────────────────────────────

/** Extract all matches from a matches API response */
export function extractMatches(data: MatchesResponse): MatchData[] {
  const matches: MatchData[] = [];
  for (const typeMatch of data.typeMatches ?? []) {
    for (const series of typeMatch.seriesMatches ?? []) {
      if (series.seriesAdWrapper?.matches) {
        matches.push(...series.seriesAdWrapper.matches);
      }
    }
  }
  return matches;
}

/** Format innings score like "186/8" */
export function formatScore(innings?: InningsScore): string {
  if (!innings) return '';
  return `${innings.runs}/${innings.wickets}`;
}

/** Format overs like "14.2" */
export function formatOvers(innings?: InningsScore): string {
  if (!innings) return '';
  return `${innings.overs}`;
}

/** Extract stories from news response, filtering ads */
export function extractStories(data: { storyList: StoryListItem[] }): Story[] {
  return (data.storyList ?? [])
    .filter((item): item is { story: Story } => !!item.story?.hline)
    .map((item) => item.story);
}
