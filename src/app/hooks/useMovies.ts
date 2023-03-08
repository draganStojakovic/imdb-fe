import { useState } from 'react';
import { IMovie } from 'app/types/IMovies';
import { useQuery } from 'react-query';
import { moviesService } from 'app/services/movies.service';
import { useEffect } from 'react';
import { isMovies } from 'app/utils/typeCheckers';
import { useContext } from 'react';
import { UserContext } from 'app/context/UserContext';

const useMovies = () => {
  const [movies, setMovies] = useState<IMovie[] | null>(null);

  const { user } = useContext(UserContext);

  const setMoviesToState = (movies: IMovie[]) => {
    movies && setMovies(movies);
  };

  const { data } = useQuery('movies', moviesService.GetMovies, {
    enabled: !!user,
  });

  useEffect(() => {
    if (isMovies(data)) {
      setMoviesToState(data);
    }
  }, [data]);

  return {
    movies,
    setMoviesToState,
    setMovies,
  };
};

export default useMovies;
