import { IGenre } from './IGenre';
import { IComment } from './IComment';

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

export interface IMovieWithComments extends IMovie {
  comments: IComment[];
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
