import { IUser } from "app/types/IUser";

export function isAnUser(obj: any): obj is IUser {
  return obj;
}