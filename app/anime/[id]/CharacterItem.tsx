import Image from "next/image";
import { useEffect, useRef } from "react";

interface CharacterProps {
  src: string,
  name: string,
  isLast: boolean,
  nextPage: () => void
}

const CharacterItem = ({src, name, isLast, nextPage}: CharacterProps) => {
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
    <div className='relative bg-cover bg-center h-32 w-32 rounded-md overflow-hidden m-3 flex-shrink-0 items-center' ref={observerRef}>
      <Image src={src || '/favicon.ico'} alt={name} fill sizes='33vw' style={{ objectFit: 'cover' }} priority={false}/>
      <div className='absolute bottom-0 left-0 right-0 bg-black opacity-75 p-1'>
        <p className='text-m truncate text-sm text-center text-white mb-2'>{name}</p>
      </div>
    </div>
  )
}

export default CharacterItem;
