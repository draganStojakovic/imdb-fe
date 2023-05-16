import { moviesService } from 'app/services/movies.service';
import { IMovieOMdb, IOMDb, IOMDbError } from 'app/types/IMovies';
import { IGenre } from 'app/types/IGenre';
import { isGenres } from 'app/utils/typeCheckers';
import { useEffect, useState } from 'react';
import useGetGenresAlt from './useGetGenresAlt';
import {
  isOMDbResponse,
  isOMDbError,
  isObjOfType,
} from 'app/utils/typeCheckers';

export default function useGetOMDbMovie(searchTerm: string) {
  const genres = useGetGenresAlt();

  const [data, setData] = useState<IMovieOMdb | null>(null);
  const [error, setError] = useState<IOMDbError | null>(null);

  function sanitizeOMDbResponse(
    movie: IOMDb,
    genresFromDB: IGenre[]
  ): IMovieOMdb | null {
    const genreLowerCase = movie.Genre.toLowerCase().split(', ');

    const newGenres = genresFromDB
      .map((genre) => {
        if (genreLowerCase.includes(genre.name)) return genre;
      })
      .filter((data) => data);

    if (isGenres(newGenres))
      return {
        title: movie.Title,
        description: movie.Plot,
        coverImage: movie.Poster,
        genres: newGenres,
      };

    return null;
  }

  async function getOMDbMovie(movieTitle: string) {
    try {
      return await moviesService.GetOMDbMovie(movieTitle);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (searchTerm.length !== 0) {
      getOMDbMovie(searchTerm).then((data) => {
        if (isOMDbError(data)) {
          setError(data);
        } else if (isOMDbResponse(data) && isGenres(genres)) {
          const omdb = sanitizeOMDbResponse(data, genres);
          isObjOfType<IOMDb>(omdb) && setData(omdb);
        }
      });
    }
  }, [searchTerm]);

  function nullifyState(): void {
    setData(null);
    setError(null);
  }

  return {
    data,
    error,
    nullifyState,
  };
}
