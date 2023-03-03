import { IUser } from "app/types/IUser";
import { IError } from "app/types/IUser";

export function isAnUser(obj: any): obj is IUser {
  return obj;
}

export function isAnError(obj: any): obj is IError {
  return obj;
}