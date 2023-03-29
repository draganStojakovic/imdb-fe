/* eslint-disable @typescript-eslint/no-explicit-any */
import { IGenre } from 'app/types/IGenre';
import { IMovie, IMoviePaginated } from 'app/types/IMovies';
import { IUser } from 'app/types/IUser';
import { IViews } from 'app/types/IViews';
import { IVotes } from 'app/types/IVotes';

export function isAnUser(obj: any): obj is IUser {
  return obj;
}

export function isMovies(obj: any): obj is IMovie[] {
  return obj;
}

export function isMovie(obj: any): obj is IMovie {
  return obj;
}

export function isGenres(obj: any): obj is IGenre[] {
  return obj;
}

export function isMoviesPaginated(obj: any): obj is IMoviePaginated {
  return obj;
}

export function isVotes(obj: any): obj is IVotes {
  return true;
}

export function isViews(obj: any): obj is IViews {
  return true;
}
