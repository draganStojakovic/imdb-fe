export interface IMovieCreate {
  title: string;
  description: string;
  coverImage: string;
  genres: string[];
}

export interface IMovie extends IMovieCreate {
  id: string;
}
