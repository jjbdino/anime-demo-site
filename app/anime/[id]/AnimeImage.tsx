import { KitsuImage } from "@/typings";
import Image from "next/image";

interface AnimeImageProps {
  animeId: number,
  coverImage: KitsuImage
}

const AnimeImage = ({animeId, coverImage}: AnimeImageProps) => (
  <div className='relative flex bg-cover bg-center h-72 w-72 rounded-md overflow-hidden m-3'>
    <Image
      src={coverImage?.original || '/favicon.ico'}
      alt={`anime_${animeId}`}
      fill
      sizes='33vw'
      style={{objectFit: 'cover'}}
      priority={true}
      />
  </div>
)

export default AnimeImage;
