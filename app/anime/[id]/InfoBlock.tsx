'use client';
import Favorite from "@/components/toggle/Favorite";
import Rating from "@/components/toggle/Rating";
import { Anime } from "@/typings";

interface InfoBlockProps {
  anime: Anime
}

const InfoBlock = ({anime}: InfoBlockProps) => {
  const {
    id, userCount, averageRating, favoritesCount, popularityRank, ageRating,
    ageRatingGuide, showType, startDate, endDate
  } = anime;

  return (
    <div className='flex text-sm flex-col space-y-4'>
      <div className='flex space-x-2 items-center'>
        <Rating animeId={id} rating={averageRating} />
        <span>from {userCount} users</span>
      </div>
      <div className='flex space-x-2 items-center'>
        <Favorite animeId={id} favoritesCount={favoritesCount} />
        <span>Rank #{popularityRank}</span>
      </div>
      <span className='ml-2'>Rated {ageRating} {`(${ageRatingGuide})`}</span>
      <span className='ml-2'>Aired on {startDate}</span>
      <span className='ml-2'>Ongoing or Ended on {endDate}</span>
      <span className='ml-2'>Type: {showType}</span>
    </div>
  )
}

export default InfoBlock;
