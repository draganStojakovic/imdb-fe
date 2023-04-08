export interface IUser {
  id: string;
  fname: string;
  lname: string;
  email: string;
  watchedMovies: string[];
  watchList: string[];
}

export interface ISignIn {
  email: string;
  password: string;
}

export interface IRegister extends IUser {
  password: string;
  confirmPassword: string;
}

export interface IUserCommentInfo {
  _id: string;
  fname: string;
  lname: string;
}
