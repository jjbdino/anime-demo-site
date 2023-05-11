'use client';

import { Anime, Filters, KitsuLinks, LoadingProps } from "@/typings";
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";

interface ContextProps {
  animeList: Anime[],
  setAnimeList: Dispatch<SetStateAction<Anime[]>>,
  filteredList: Anime[],
  setFilteredList: Dispatch<SetStateAction<Anime[]>>,
  filters: Filters,
  setFilters: Dispatch<SetStateAction<Filters>>,
  ratedList: number[],
  setRatedList: Dispatch<SetStateAction<number[]>>,
  favoriteList: number[],
  setFavoriteList: Dispatch<SetStateAction<number[]>>,
  links: KitsuLinks,
  setLinks: Dispatch<SetStateAction<KitsuLinks>>,
  loading: LoadingProps,
  setLoading: Dispatch<SetStateAction<LoadingProps>>
  watchedList: string[],
  setWatchedList: Dispatch<SetStateAction<string[]>>,
}

const GlobalContext = createContext<ContextProps>({
  animeList: [],
  setAnimeList: (): Anime[] => [],
  filteredList: [],
  setFilteredList: (): Anime[] => [],
  filters: { search: '', favorite: false, rated: false },
  setFilters: (): Filters => { return { search: '', favorite: false, rated: false } },
  ratedList: [],
  setRatedList: (): number[] => [],
  favoriteList: [],
  setFavoriteList: (): number[] => [],
  links: { first: '', prev: '', next: '', last: '' },
  setLinks: (): KitsuLinks => { return { first: '', prev: '', next: '', last: '' } },
  loading: {loading: false, context: ''},
  setLoading: (): LoadingProps => { return { loading: false, context: '' } },
  watchedList: [],
  setWatchedList: (): string[] => [],
});

export const GlobalContextProvider = ({ children }: any) => {
  const undefinedStorage = typeof localStorage == 'undefined'
  const watched = undefinedStorage ? [] : JSON.parse(localStorage.getItem('watchedList') || '[]')
  const rated = undefinedStorage ? [] : JSON.parse(localStorage.getItem('ratedList') || '[]')
  const favorite = undefinedStorage ? [] : JSON.parse(localStorage.getItem('favoriteList') || '[]')

  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [filteredList, setFilteredList] = useState<Anime[]>([]);
  const [filters, setFilters] = useState<Filters>({ search: '', favorite: false, rated: false });
  const [ratedList, setRatedList] = useState<number[]>(rated);
  const [favoriteList, setFavoriteList] = useState<number[]>(favorite);
  const [links, setLinks] = useState<KitsuLinks>({ first: '', prev: '', next: '', last: '' });
  const [loading, setLoading] = useState<LoadingProps>({ loading: false, context: '' });
  const [watchedList, setWatchedList] = useState<string[]>(watched);

  useEffect(() => {
    localStorage.setItem('watchedList', JSON.stringify(watchedList))
  }, [watchedList]);

  useEffect(() => {
    localStorage.setItem('ratedList', JSON.stringify(ratedList))
  }, [ratedList]);

  useEffect(() => {
    localStorage.setItem('favoriteList', JSON.stringify(favoriteList))
  }, [favoriteList]);


  return (
    <GlobalContext.Provider value={{animeList, setAnimeList, filteredList, setFilteredList, filters, setFilters, ratedList, setRatedList, favoriteList, setFavoriteList, links, setLinks, loading, setLoading, watchedList, setWatchedList}}>
      {children}
    </GlobalContext.Provider>
  )
};

export const useGlobalContext = () => useContext(GlobalContext);
