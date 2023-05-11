import { rawCollectionToAnimeList } from "@/helpers/dataTransformers";
import axios from "axios";

const initialApiCall = 'https://kitsu.io/api/edge/anime?page[limit]=10&page[offset]=0'

export const useAnimeList = async (next: string = initialApiCall) => {
  const { data: { data, links } } = await axios.get<any>(next);
  return { list: (typeof data === 'undefined' ? [] : rawCollectionToAnimeList(data)), links };
};
