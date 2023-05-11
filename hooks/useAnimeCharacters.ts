import axios from "axios";

export const useAnimeCharacters = async (param: number|string) => {
  const initialApiCall = `https://kitsu.io/api/edge/castings?page[limit]=20&page[offset]=0&filter[media_type]=Anime&filter[media_id]=${param}&filter[is_character]=true&include=character&sort=-featured`
  const call = typeof param == 'number' ? initialApiCall : param;
  
  return await axios.get<any>(call);
};
