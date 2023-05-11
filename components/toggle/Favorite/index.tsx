import { useGlobalContext } from "@/app/Context/store";
import { addToList, removeFromList } from "@/helpers/dataManipulators";
import { useEffect, useState } from "react";

interface FavoriteProps {
  animeId: number,
  favoritesCount: number
}

const Favorite = ({animeId, favoritesCount}: FavoriteProps) => {
  const { favoriteList, setFavoriteList } = useGlobalContext();
  const [favorite, setFavorite] = useState<boolean>(-1 !== favoriteList.indexOf(animeId))
  
  const toggleFavorite = () => {
    setFavorite((prevState) => !prevState)
  }

  useEffect(() => {
    setFavoriteList((prevState) => favorite ? addToList(prevState, animeId) : removeFromList(prevState, animeId))
  }, [favorite])

  const iconClass = (active: boolean) => {
    return active
    ? 'fa fa-heart text-red-400 text-sm m-2'
    : 'fa fa-heart text-gray-500 text-sm m-2';
  };

  return (
    <>
      <i className={iconClass(favorite)} onClick={toggleFavorite}/>
      {favoritesCount + (favorite ? 1 : 0)}
    </>
  );
};

export default Favorite;
