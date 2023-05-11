'use client';
import { useAnimeEpisodes } from "@/hooks/useAnimeEpisodes";
import EpisodeItem from "./EpisodeItem";
import { Loading } from "@/components/Loading";
import { useEffect, useRef, useState } from "react";
import { AxiosError } from "axios";
import { useGlobalContext } from "@/app/Context/store";
import { Episode } from "@/typings";
import { rawCollectionToEpisodeList } from "@/helpers/dataTransformers";
import { trimDupesFromList } from "@/helpers/dataManipulators";

interface EpisodeListProps {
  animeId: number
}

const EpisodeList = ({animeId}: EpisodeListProps) => {
  const { loading, setLoading } = useGlobalContext();
  const [ episodes, setEpisodes ] = useState<Episode[]>(() => []);
  const [ nextLink, setNextLink ] = useState<string>('');
  const [ page, setPage ] = useState(1);

  const fetchEpisodes = async (param: number|string) => {
    setLoading(prevState => { return {...prevState, loading: true} });
    useAnimeEpisodes(param)
    .then(({data}) => {
      const eps = rawCollectionToEpisodeList(data.data);
      setNextLink(data.links?.next || '')
      setEpisodes(prevState => { return trimDupesFromList(prevState.concat(eps)) });
     })
    .catch((e: Error | AxiosError) => {
      console.log(e);
    })
    .finally(() => {
      setLoading(prevState => { return {...prevState, loading: false} });
    });
  }

  useEffect(() => {
    if (1 === page) {
      fetchEpisodes(animeId);
    } else {
      0 !== nextLink.length && fetchEpisodes(nextLink);
    }
  }, [page]);

  return (
    <div>
      <h1 className='font-bold py-2'>Episodes</h1>
      <div className='h-28 overflow-y-scroll'>
        {
          episodes.map(({airdate, title, number}, index) => {
            return <EpisodeItem key={index} animeId={animeId} date={airdate}
              number={number} title={title} isLast={index === episodes.length - 1}
              nextPage={() => setPage(page + 1)}
            />
          })
        }
        { loading.loading && <Loading /> }
      </div>
    </div>
  )
};

export default EpisodeList;
