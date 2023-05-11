'use client'
import AnimeCard from "./AnimeCard";
import { useAnimeList } from "@/hooks/useAnimeList";
import { Search } from "@/components/Search";
import { useGlobalContext } from "../Context/store";
import { useEffect, useState } from "react";
import { Anime } from "@/typings";
import HeaderSection from "@/components/HeaderSection";
import NavSection from "@/components/NavSection";
import { Filters } from "@/components/Filters";
import { Loading } from "@/components/Loading";
import { AxiosError } from "axios";

const AnimeListPage = () => {
  const {
    loading, filters, animeList, filteredList, favoriteList, ratedList, setFilteredList, links, setLoading,
    setAnimeList, setLinks
  } = useGlobalContext();
  const [ list, setList ] = useState<Anime[]>(() => []);
  const [ page, setPage ] = useState(() => 1);
  const [ filtering, setFiltering ] = useState(() => false);

  const fetchList = (route?: string) => {
    console.log({route});
    setLoading(prevState => { return {...prevState, loading: true} });
    useAnimeList(route)
    .then(({list, links}) => {
      setAnimeList(prevState => { return prevState.concat((list)) });
      setLinks(links);
    }).catch((e: Error | AxiosError) => {
      console.log(e);
    })
    .finally(() => {
      setLoading(prevState => { return {...prevState, loading: false} });
    });
  }

  useEffect(() => {
    if (filtering) return;
    console.log({filtering});
    if (1 === page) {
      fetchList();
    } else {
      const { next } = links;
      0 !== next.length && typeof next !== 'undefined' && fetchList(links?.next);
    }
  }, [page])

  useEffect(() => {
    const {search, favorite, rated} = filters;
    setFilteredList(animeList.filter(({id, title}: Anime) => {
      const inQuery = title.toLocaleLowerCase().includes(search);
      const inFavorites = favorite ? (-1 !== favoriteList.indexOf(id)) : true;
      const inRated = rated ? (-1 !== ratedList.indexOf(id)) : true;
      return inQuery && inFavorites && inRated
    }));
    setFiltering(0 !== search.length || favorite || rated);
  }, [filters])

  useEffect(() => {
    const {search, favorite, rated} = filters;
    const noFilter = 0 === search.length && !favorite && !rated;
    setList(noFilter && 0 === filteredList.length ? animeList : filteredList)
  }, [animeList, filteredList])

  return (
  <div className='h-screen'>
    <HeaderSection title='Anime List' />
    <NavSection>
      <Filters/>
      <Search />
      <p className='float-right text-s'>{list.length} Results</p>
    </NavSection>
    <div className='p-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
      {
        list.map(({id, title, coverImage, averageRating, favoritesCount}, index) => (
          <AnimeCard key={id} id={id} title={title}
            coverImage={coverImage} averageRating={averageRating}
            favoritesCount={favoritesCount} isLast={index === list.length - 1}
            nextPage={() => setPage(page + 1)}
            />
        ))
      }
    </div>
    { loading.loading && <Loading /> }
  </div>
  );
}

export default AnimeListPage;
