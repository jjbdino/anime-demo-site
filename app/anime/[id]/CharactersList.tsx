'use client';
import { useAnimeCharacters } from "@/hooks/useAnimeCharacters";
import CharacterItem from "./CharacterItem";
import { Character } from "@/typings";
import { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "@/app/Context/store";
import { Loading } from "@/components/Loading";
import { AxiosError } from "axios";
import { rawCollectionToCharacterList } from "@/helpers/dataTransformers";

interface CharacterListProps {
  animeId: number
}

const CharacterList = ({animeId}: CharacterListProps) => {
  const { loading, setLoading } = useGlobalContext();
  const [ characters, setCharacters ] = useState<Character[]>(() => []);
  const [ nextLink, setNextLink ] = useState<string>('');
  const [ page, setPage ] = useState(1);

  const fetchCharacters = async (param: number|string) => {
    setLoading(prevState => { return {...prevState, loading: true} });
    
    useAnimeCharacters(param)
    .then(({data}) => {
      const episodes = rawCollectionToCharacterList(data.included);
      setNextLink(data.links?.next || '');
      setCharacters(prevState => { return prevState.concat(episodes) });
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
      fetchCharacters(animeId);
    } else {
      0 !== nextLink.length && fetchCharacters(nextLink);
    }
  }, [page]);

  return (
    <div className='my-5'>
      <h1 className='font-bold py-2'>Characters</h1>
      <div className='flex overflow-x-scroll'>
        {characters.map(({name, image}: Character, index) => {
          return <CharacterItem key={index} src={image?.original} name={name}
            isLast={index === characters.length - 1} nextPage={() => setPage(page + 1)}
          />
        })}
        { loading.loading && <Loading /> }
      </div>
    </div>
  )
}

export default CharacterList;
