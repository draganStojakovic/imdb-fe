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
}

export interface IMoviePaginated {
  currentPage: number;
  movies: IMovie[];
  totalPages: number;
}