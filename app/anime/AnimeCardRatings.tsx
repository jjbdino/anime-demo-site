'use client';
import Rating from "@/components/toggle/Rating";
import Favorite from "@/components/toggle/Favorite";

interface RatingsProps {
  id: number,
  averageRating: string,
  favoritesCount: number
}

const AnimeCardRatings = ({id, averageRating, favoritesCount}: RatingsProps) => {
  return (
    <div className='items-center m-50'>
      <div className='float-left'>
        <Rating animeId={id} rating={averageRating} />
      </div>
      <div className='float-right'>
        <Favorite animeId={id} favoritesCount={favoritesCount} />
      </div>
    </div>
  );
};

export default AnimeCardRatings;