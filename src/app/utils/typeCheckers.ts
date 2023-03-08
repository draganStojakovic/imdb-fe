import { IMovie } from 'app/types/IMovies';
import { IUser } from 'app/types/IUser';

export function isAnUser(obj: any): obj is IUser {
  return obj;
}

export function isMovies(obj: any): obj is IMovie[] {
  return obj;
}
