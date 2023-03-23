/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from 'react';

interface IMovieParams {
  page: number;
  search: string;
  genres: string;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  setGenres: (genres: string) => void;
}

export const MovieParamsContext = createContext<IMovieParams>({
  page: 1,
  search: '',
  genres: '',
  setPage: (_page: number) => Function,
  setSearch: (_search: string) => Function,
  setGenres: (_genres: string) => Function,
});
