import { useState } from 'react';
import { IMovie } from 'app/types/IMovies';
import { useQuery } from 'react-query';
import { moviesService } from 'app/services/movies.service';
import { useEffect } from 'react';
import { isMovies } from 'app/utils/typeCheckers';

const useMovies = () => {
  const [movies, setMovies] = useState<IMovie[] | null>(null);
  const [movie, setMovie] = useState<IMovie | null>(null);

  const setMoviesToState = (movies: IMovie[]) => {
    movies && setMovies(movies);
  };

  const setMovieToState = (movie: IMovie) => {
    movie && setMovie(movie);
  };

  const { data } = useQuery('movies', moviesService.GetMovies);

  useEffect(() => {
    if (isMovies(data)) {
      setMoviesToState(data);
    }
  }, [data]);

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
