'use client';
import { useGlobalContext } from "@/app/Context/store";

export const Filters = () => {
  const { filters: { favorite, rated }, setFilters } = useGlobalContext();

  const toggleStarFilter = () => {
    setFilters( ({rated, ...prevState}) => { return {...prevState, rated: !rated} })
  }

  const toggleHeartFilter = () => {
    setFilters( ({favorite, ...prevState}) => { return {...prevState, favorite: !favorite} })
  }

  const iconClassStar = (active: boolean) => {
    return active
    ? 'fa fa-star text-yellow-400 text-md mx-2 my-3'
    : 'fa fa-star text-gray-500 text-md mx-2 my-3';
  };

  const iconClassHeart = (active: boolean) => {
    return active
    ? 'fa fa-heart text-red-400 text-md mx-2 my-3'
    : 'fa fa-heart text-gray-500 text-md mx-2 my-3';
  };
  
  return (
    <div className='flex float-left inline-block'>
      <p className='max-w-xs text-s my-2'>Filters:</p>
      <i className={iconClassStar(rated)} onClick={toggleStarFilter}/>
      <i className={iconClassHeart(favorite)} onClick={toggleHeartFilter}/>
    </div>
  );
};
