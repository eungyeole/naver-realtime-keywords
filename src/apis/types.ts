export interface Ranking {
  id: number;
  rank: number;
  keyword: string;
}

export interface GetRankingResponse {
  rankings: Ranking[];
  createdAt: string;
}
