import { ICommentPaginated } from 'app/types/IComment';
import { IGenre } from 'app/types/IGenre';
import { IMovie, IMoviePaginated } from 'app/types/IMovies';
import { IUser } from 'app/types/IUser';
import { IViews } from 'app/types/IViews';
import { IVote } from 'app/types/IVote';

export function isObjOfType<T>(obj: unknown): obj is T {
  return !!obj;
}

export function returnObject<T>(
  obj:
    | IMoviePaginated
    | IMovie
    | IMovie[]
    | IUser
    | IVote
    | IGenre
    | IGenre[]
    | IViews
    | ICommentPaginated
) {
  if (obj) return obj as T;
}
