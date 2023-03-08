import { useState } from 'react';
import { IMovie } from 'app/types/IMovies';

const useMovies = () => {
  const [movies, setMovies] = useState<IMovie[] | null>(null);
  const [movie, setMovie] = useState<IMovie | null>(null);

  const setMoviesToState = (movies: IMovie[]) => {
    movies && setMovies(movies);
  };

  const setMovieToState = (movie: IMovie) => {
    movie && setMovie(movie);
  };

  return {
    movie,
    movies,
    setMoviesToState,
    setMovieToState,
    setMovies,
    setMovie,
  };
};

export default useMovies;
