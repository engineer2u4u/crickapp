// Static JSON data for development - avoids API calls
// Each key maps to an API endpoint pattern

import matchesLive from '../data/matches_live.json';
import matchesRecent from '../data/matches_recent.json';
import matchesUpcoming from '../data/matches_upcoming.json';
import seriesLeague from '../data/series_league.json';
import seriesArchivesLeague from '../data/series_archives_league.json';
import rankingsTeamsTest from '../data/rankings_teams_test.json';
import rankingsTeamsOdi from '../data/rankings_teams_odi.json';
import rankingsTeamsT20 from '../data/rankings_teams_t20.json';
import newsIndex from '../data/news_index.json';
import newsDetail138396 from '../data/news_detail_138396.json';
import series9241Info from '../data/series_9241_info.json';
import series9241Squads from '../data/series_9241_squads.json';
import series9241Squad99705 from '../data/series_9241_squad_99705.json';
import match149193Info from '../data/match_149193_info.json';
import match149193Scorecard from '../data/match_149193_scorecard.json';
import match149193Commentary from '../data/match_149193_commentary.json';
import match151763Info from '../data/match_151763_info.json';
import match151763Scorecard from '../data/match_151763_scorecard.json';
import match151763Commentary from '../data/match_151763_commentary.json';

// Simulated network delay
const delay = (ms = 200) => new Promise<void>((r) => setTimeout(r, ms));

// Route an endpoint to the right JSON file
export async function mockRequest<T>(endpoint: string): Promise<T> {
  await delay();

  // ─── Matches ───────────────────────────────────
  if (endpoint === '/matches/v1/live') return matchesLive as T;
  if (endpoint === '/matches/v1/recent') return matchesRecent as T;
  if (endpoint === '/matches/v1/upcoming') return matchesUpcoming as T;

  // ─── Series ────────────────────────────────────
  if (endpoint.match(/^\/series\/v1\/(international|league|domestic|women)$/)) {
    return seriesLeague as T; // we only cached league
  }
  if (endpoint.match(/^\/series\/v1\/archives\//)) {
    return seriesArchivesLeague as T;
  }
  // Series squads: /series/v1/{id}/squads/{squadId}
  if (endpoint.match(/^\/series\/v1\/\d+\/squads\/\d+$/)) {
    return series9241Squad99705 as T; // return CSK squad for any squad request
  }
  // Series squads list: /series/v1/{id}/squads
  if (endpoint.match(/^\/series\/v1\/\d+\/squads$/)) {
    return series9241Squads as T;
  }
  // Series info: /series/v1/{id}
  if (endpoint.match(/^\/series\/v1\/\d+$/)) {
    return series9241Info as T;
  }

  // ─── Match Center ──────────────────────────────
  // CSK vs KKR completed match (has full scorecard + commentary)
  if (endpoint.match(/^\/mcenter\/v1\/\d+\/hscard$/)) {
    return match151763Scorecard as T;
  }
  if (endpoint.match(/^\/mcenter\/v1\/\d+\/comm$/)) {
    return match151763Commentary as T;
  }
  if (endpoint.match(/^\/mcenter\/v1\/\d+$/)) {
    return match151763Info as T;
  }

  // ─── Rankings ──────────────────────────────────
  if (endpoint.includes('rankings/teams') && endpoint.includes('test')) {
    return rankingsTeamsTest as T;
  }
  if (endpoint.includes('rankings/teams') && endpoint.includes('odi')) {
    return rankingsTeamsOdi as T;
  }
  if (endpoint.includes('rankings/teams') && endpoint.includes('t20')) {
    return rankingsTeamsT20 as T;
  }

  // ─── News ──────────────────────────────────────
  if (endpoint === '/news/v1/index') return newsIndex as T;
  if (endpoint.match(/^\/news\/v1\/detail\/\d+$/)) {
    return newsDetail138396 as T; // return same article for any detail
  }

  // Fallback: throw so caller's .catch() handles it
  throw new Error(`[MockData] No mock for endpoint: ${endpoint}`);
}
