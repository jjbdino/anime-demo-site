import HeaderSection from "@/components/HeaderSection";
import NavSection from "@/components/NavSection";
import Link from "next/link";
import AnimeWrapper from "./AnimeWrapper";
import { rawToAnime } from "@/helpers/dataTransformers";
import axios from "axios";
import { Loading } from "@/components/Loading";

interface AnimeProps {
  params: {id: string}
}

async function AnimePage({ params: { id } }: AnimeProps) {
  const { data: { data } } = await axios.get<any>(`https://kitsu.io/api/edge/anime/${id}`);
  const anime = rawToAnime(data);

  return(<>
    <HeaderSection title={anime?.title}/>
    <NavSection>
      <Link href='/' className='float-left'>
        <i className='fa fa-chevron-left m-2' /><span className='text-s my-2'>Back</span>
      </Link>
    </NavSection>
    <AnimeWrapper anime={anime} />
    {/* {anime ? <AnimeWrapper anime={anime} /> : <Loading />} */}
  </>)
}

export default AnimePage;
