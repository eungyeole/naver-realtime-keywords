import { apiClient } from "./client";
import { GetRankingResponse } from "./types";

export const getRankingApi = async () => {
  const { data } = await apiClient.get<GetRankingResponse>("/ranking");

  return data;
};
