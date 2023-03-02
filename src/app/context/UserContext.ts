import { createContext } from "react";
import { IUser } from "../types/IUser";

interface IUserContext {
  user: IUser | null;
  setUser: (user: IUser) => void;
  login: (user: IUser) => void;
  logout: () => void;
}

export const UserContext = createContext<IUserContext>({
  user: null,
  setUser: (_user: IUser) => Function,
  login: (_user: IUser) => Function,
  logout: () => Function,
});
