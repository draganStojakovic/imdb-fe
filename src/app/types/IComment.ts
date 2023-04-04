import { IUserCommentInfo } from './IUser';

export interface ICommentDraft {
  content: string;
  userId: string;
  movieId: string;
}

export interface ICommentResponse {
  id: string;
  content: string;
  userId: string;
}

export interface IComment {
  _id: string;
  content: string;
  userId: IUserCommentInfo;
}

export interface ICommentPaginated {
  comments: IComment[];
  shownComments: number;
  remainingComments: number;
}
