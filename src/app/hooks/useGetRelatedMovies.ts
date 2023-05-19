import { useState, useEffect } from 'react';
import { IMovieStrippedDown, IMovie } from 'app/types/IMovies';
import { IPopulatedGenre } from 'app/types/IGenre';
import { moviesService } from 'app/services/movies.service';
import { isObjOfType, isPrimitiveType } from 'app/utils/typeCheckers';
import { IError } from 'app/types/IError';

export default function useGetRelatedMovies(
  movie: IMovie | IError | undefined,
  movieId: string | undefined
) {
  const [data, setData] = useState<Array<IMovieStrippedDown> | null>(null);

  function formatGenres(movie: IMovie) {
    const { genres } = movie;
    const genresFiltered = (genres as unknown as IPopulatedGenre[]).map(
      (genre) => genre._id
    );
    const movieGenres = genresFiltered.join(',');
    return movieGenres;
  }

  async function getRelatedMovies(genres: string) {
    try {
      return await moviesService.RelatedMovies(genres);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleGetRelatedMovies(
    movie: IMovie,
    id: string
  ): Promise<IMovieStrippedDown[] | null> {
    const formattedGenres = formatGenres(movie);
    const response = await getRelatedMovies(formattedGenres);
    if (isObjOfType<IMovieStrippedDown[]>(response)) {
      const filteredData = response.filter((genre) => genre.id !== id);
      if (filteredData.length !== 0) return filteredData;

      return null;
    }
    return null;
  }

  function checkIfDuplicate(data: Array<IMovieStrippedDown>): boolean {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === movieId) return true;
    }
    return false;
  }

  useEffect(() => {
    if (isPrimitiveType(movieId, 'string') && isObjOfType<IMovie>(movie)) {
      handleGetRelatedMovies(movie, movieId).then((movies) => {
        if (isObjOfType<Array<IMovieStrippedDown>>(movies)) {
          if (checkIfDuplicate(movies)) {
            setData(() => movies.filter((movie) => movie.id !== movieId));
          } else {
            setData(movies);
          }
        }
      });
    }
  }, [movie, movieId]);

  return { data };
}
