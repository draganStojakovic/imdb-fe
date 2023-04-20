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

export interface IRating {
  Source: string;
  Value: string;
}

export interface IOMDb {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: IRating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export interface IOMDbError {
  Response: string;
  Error: string;
}

export type IMovieOMdb = Pick<
  IMovie,
  'title' | 'description' | 'coverImage' | 'genres'
>;
