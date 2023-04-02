import { IUserCommentInfo } from "./IUser";

export interface IComment {
  _id: string;
  content: string;
  userId: IUserCommentInfo;
}
