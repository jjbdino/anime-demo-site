import { KitsuImage } from '@/typings';
import AnimeCardRatings from './AnimeCardRatings';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

interface AnimeCardProps {
  id: number,
  title: string,
  coverImage: KitsuImage,
  averageRating: string,
  favoritesCount: number,
  isLast: boolean,
  nextPage: () => void
}

const AnimeCard = ({id, title, coverImage, averageRating, favoritesCount, isLast, nextPage}: AnimeCardProps) => {
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
    <div className='relative flex items-center bg-cover bg-center h-60 w-60 rounded-md overflow-hidden m-3' ref={observerRef}>
      <Link href={`/anime/${id}`}>
        <Image src={coverImage?.original || '/favicon.ico'} alt={title} fill sizes='100vw, 100vh' style={{objectFit: 'cover'}} priority={false}/>
      </Link>
      <div className='absolute bottom-0 left-0 right-0 bg-black opacity-75 p-1 z-20 px-5'>
        <p className='text-m truncate font-bold text-center text-white mb-2'>{title}</p>
        <AnimeCardRatings id={id} averageRating={averageRating} favoritesCount={favoritesCount} />
      </div>
    </div>
  );
};

export default AnimeCard;
