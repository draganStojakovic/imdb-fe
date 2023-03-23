import { useState } from 'react';

function useMovieParams() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [genres, setGenres] = useState<string>('');

  return {
    page,
    setPage,
    search,
    setSearch,
    genres,
    setGenres,
  };
}

export default useMovieParams;
