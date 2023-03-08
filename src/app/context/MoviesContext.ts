/* eslint-disable @typescript-eslint/no-unused-vars */
import { IMovie } from 'app/types/IMovies';
import { createContext } from 'react';

interface IMovieContext {
  movies: IMovie[] | null;
  setMovies: (movies: IMovie[]) => void;
  setMoviesToState: (movies: IMovie[]) => void;
}

export const MoviesContext = createContext<IMovieContext>({
  movies: null,
  setMovies: (_movies: IMovie[]) => Function,
  setMoviesToState: (_movies: IMovie[]) => Function,
});
