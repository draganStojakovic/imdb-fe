import { IUserCommentInfo } from './IUser';

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
