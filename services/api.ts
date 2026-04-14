import { RAPIDAPI_KEY, RAPIDAPI_HOST } from '@env';

const BASE_URL = `https://${RAPIDAPI_HOST}`;

const headers: Record<string, string> = {
  'Content-Type': 'application/json',
  'x-rapidapi-key': RAPIDAPI_KEY,
  'x-rapidapi-host': RAPIDAPI_HOST,
};

const imgHeaders: Record<string, string> = {
  'x-rapidapi-key': RAPIDAPI_KEY,
  'x-rapidapi-host': RAPIDAPI_HOST,
};

async function request<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, { headers });
  if (!res.ok) {
    throw new Error(`API ${res.status}: ${endpoint}`);
  }
  return res.json();
}

// ─── Matches ──────────────────────────────────────────────

export function getLiveMatches() {
  return request('/matches/v1/live');
}

export function getRecentMatches() {
  return request('/matches/v1/recent');
}

export function getUpcomingMatches() {
  return request('/matches/v1/upcoming');
}

// ─── Match Center ─────────────────────────────────────────

export function getMatchInfo(matchId: number) {
  return request(`/mcenter/v1/${matchId}`);
}

export function getMatchScorecard(matchId: number) {
  return request(`/mcenter/v1/${matchId}/hscard`);
}

export function getMatchCommentary(matchId: number) {
  return request(`/mcenter/v1/${matchId}/comm`);
}

export function getMatchOvers(matchId: number, inningsId: number) {
  return request(`/mcenter/v1/${matchId}/overs?inningsId=${inningsId}`);
}

// ─── Series / Tournaments ─────────────────────────────────

export function getSeriesList(type: 'international' | 'league' | 'domestic' | 'women' = 'international') {
  return request(`/series/v1/${type}`);
}

export function getSeriesArchives(type: 'international' | 'league' | 'domestic' | 'women' = 'league') {
  return request(`/series/v1/archives/${type}`);
}

export function getSeriesInfo(seriesId: number) {
  return request(`/series/v1/${seriesId}`);
}

export function getSeriesMatches(seriesId: number) {
  return request(`/series/v1/${seriesId}/matches`);
}

export function getSeriesSquads(seriesId: number) {
  return request(`/series/v1/${seriesId}/squads`);
}

export function getSquadPlayers(seriesId: number, squadId: number) {
  return request(`/series/v1/${seriesId}/squads/${squadId}`);
}

export function getPointsTable(seriesId: number) {
  return request(`/series/v1/${seriesId}/points-table`);
}

// ─── Rankings ─────────────────────────────────────────────

export function getRankings(type: 'batsmen' | 'bowlers' | 'allrounders' | 'teams', format: 'test' | 'odi' | 't20' = 'test') {
  return request(`/stats/v1/rankings/${type}?formatType=${format}`);
}

// ─── Players ──────────────────────────────────────────────

export function getPlayerInfo(playerId: number) {
  return request(`/stats/v1/player/${playerId}`);
}

export function getPlayerBatting(playerId: number) {
  return request(`/stats/v1/player/${playerId}/batting`);
}

export function getPlayerBowling(playerId: number) {
  return request(`/stats/v1/player/${playerId}/bowling`);
}

export function searchPlayers(query: string) {
  return request(`/stats/v1/player/search?plrN=${encodeURIComponent(query)}`);
}

// ─── News ─────────────────────────────────────────────────

export function getNewsList() {
  return request('/news/v1/index');
}

export function getNewsDetail(newsId: number) {
  return request(`/news/v1/detail/${newsId}`);
}

export function getNewsTopics() {
  return request('/news/v1/topics');
}

// ─── Images ──────────────────────────────────────────────

export function getImageUrl(imageId: number | string): string {
  return `${BASE_URL}/img/v1/i1/c${imageId}/i.jpg`;
}

export const imageHeaders = imgHeaders;

/** Fetch image as base64 data URI (workaround for RN Image not sending headers on Android) */
export async function fetchImageBase64(imageId: number | string): Promise<string | null> {
  try {
    const res = await fetch(getImageUrl(imageId), { headers: imgHeaders });
    if (!res.ok) return null;
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}
