import { IGenre } from './IGenre';

export interface IMovieDraft {
  title: string;
  description: string;
  coverImage: string;
  genres: string[];
}

export interface IMovie {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  genres: IGenre[];
  likes: string[];
  dislikes: string[];
  views: string;
}

export interface IMoviePaginated {
  currentPage: number;
  movies: IMovie[];
  totalPages: number;
}

export interface IVoteMoviePayload {
  movieId: string;
  userId: string;
  button: string;
}

export interface IMovieWatchList {
  _id: string;
  title: string;
  coverImage: string;
}

export type IMovieStrippedDown = Pick<IMovie, 'id' | 'coverImage'>;
