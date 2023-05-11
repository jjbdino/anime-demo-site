import Watch from "@/components/toggle/Watch";
import { useEffect, useRef } from "react";

interface EpisodeProps {
  animeId: number,
  date: string,
  title: string,
  number: number,
  isLast: boolean,
  nextPage: () => void
}

const EpisodeItem = ({animeId, number, date, title, isLast, nextPage}: EpisodeProps) => {
  const observerRef = useRef(null);

  useEffect(() => {
    if (!observerRef?.current) return;
  
    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        nextPage();
        observer.unobserve(entry.target);
      }
    });
    observer.observe(observerRef.current);
  }, [isLast]);

  return (
    <div className='flex space-x-4 text-sm items-center' ref={observerRef}>
      <Watch epCode={`${animeId}_${number}`} />
      <span>{date || '-'}</span>
      <p>{number}: {title || 'Untitled'}</p>
    </div>
  )
}

export default EpisodeItem;
