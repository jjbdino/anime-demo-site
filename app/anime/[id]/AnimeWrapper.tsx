import { Anime } from "@/typings";
import EpisodeList from "./EpisodesList";
import InfoBlock from "./InfoBlock";
import CharacterList from "./CharactersList";
import AnimeImage from "./AnimeImage";

interface AnimeWrapperProps {
  anime: Anime,
}

const AnimeWrapper = ({anime}: AnimeWrapperProps) => {
  const {id, synopsis, coverImage} = anime

  return (
    <div className='mb-10 mx-10 flex'>
      <div className='w-2/6'>
        <AnimeImage animeId={id} coverImage={coverImage} />
        <InfoBlock anime={anime} />
      </div>
      <div className='w-4/6'>
        <p>{synopsis}</p>
        <CharacterList animeId={id} />
        <EpisodeList animeId={id} />
      </div>
    </div>
  )
};

export default AnimeWrapper;
