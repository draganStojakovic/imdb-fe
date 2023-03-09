import { IGenre } from './IGenre';

export interface IMovieCreate {
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
