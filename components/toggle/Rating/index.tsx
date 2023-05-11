import { useGlobalContext } from "@/app/Context/store";
import { addToList, removeFromList } from "@/helpers/dataManipulators";
import { useEffect, useState } from "react";

interface RatingProps {
  animeId: number,
  rating: string
}

const Rating = ({animeId, rating}: RatingProps) => {
  const { ratedList, setRatedList } = useGlobalContext();
  const [rated, setRated] = useState<boolean>(-1 !== ratedList.indexOf(animeId))
  
  const toggleRated = () => {
    setRated((prevState) => !prevState)
  }

  useEffect(() => {
    setRatedList((prevState) => rated ? addToList(prevState, animeId) : removeFromList(prevState, animeId))
  }, [rated])

  const iconClass = (active: boolean) => {
    return active
    ? 'fa fa-star text-yellow-400 text-sm m-2'
    : 'fa fa-star text-gray-500 text-sm m-2';
  };

  return (
    <>
      <i className={iconClass(rated)} onClick={toggleRated}/>
        {rating}
    </>
  );
};

export default Rating;
