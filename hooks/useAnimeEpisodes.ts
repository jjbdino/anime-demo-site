import axios from "axios";

export const useAnimeEpisodes = async (param: number|string) => {
  const initialApiCall = `https://kitsu.io/api/edge/anime/${param}/episodes`
  const call = typeof param == 'number' ? initialApiCall : param;
  
  return await axios.get<any>(call);
};
