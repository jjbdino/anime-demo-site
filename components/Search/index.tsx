'use client';
import { useGlobalContext } from "@/app/Context/store";
import { useState } from "react";

export const Search = () => {
  const {filters, setFilters} = useGlobalContext();
  const [query, setQuery] = useState(() => filters.search);

  const handleSearch = (q: string) => {
    const searchTerm = q.trim();
    setQuery(() => searchTerm);
    setFilters(prevState => { return {...prevState, search: searchTerm} });
  }

  return(
    <div className='w-full'>
      <i className='fa fa-search text-gray-300 text-md m-2'/>
      <input
        className='appearance-none bg-gray-500 bg-opacity-20 px-2 rounded-lg border-none focus:outline-none focus:border-gray-100 text-gray-300 text-sm'
        type='text'
        placeholder="Search anime"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};
