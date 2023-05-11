import { useGlobalContext } from "@/app/Context/store";
import { addToList, removeFromList } from "@/helpers/dataManipulators";
import { useEffect, useState } from "react";

interface WatchProps {
  epCode: string;
}

const Watch = ({epCode}: WatchProps) => {
  const { watchedList, setWatchedList } = useGlobalContext();
  const [ watched, setWatched] = useState<boolean>(-1 !== watchedList.indexOf(epCode))

  
  const toggleWatch = () => {
    setWatched((prevState) => !prevState)
  }

  useEffect(() => {
    setWatchedList((prevState) => watched ? addToList(prevState, epCode) : removeFromList(prevState, epCode))
  }, [watched])

  const iconClass = (active: boolean) => {
    return active
    ? 'fa fa-check text-green-400 text-sm m-2'
    : 'fa fa-check text-gray-500 text-sm m-2';
  };
  
  return (
    <i className={iconClass(watched)} onClick={toggleWatch}/>
  );
};

export default Watch;
