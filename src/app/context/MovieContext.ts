/* eslint-disable @typescript-eslint/no-unused-vars */
import { IMovie } from 'app/types/IMovies';
import { createContext } from 'react';

interface IMovieContext {
  movies: IMovie[] | null;
  movie: IMovie | null;
  setMovies: (movies: IMovie[]) => void;
  setMovie: (movie: IMovie) => void;
  setMoviesToState: (movies: IMovie[]) => void;
  setMovieToState: (movie: IMovie) => void;
}

export const MoviesContext = createContext<IMovieContext>({
  movies: null,
  movie: null,
  setMovies: (_movies: IMovie[]) => Function,
  setMovie: (_movie: IMovie) => Function,
  setMoviesToState: (_movies: IMovie[]) => Function,
  setMovieToState: (_movie: IMovie) => Function,
});
