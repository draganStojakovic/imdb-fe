import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../types/IUser";
import { ROUTES } from "../utils/static";
import { storageManager } from "../utils/StorageManager";

const userKey = "authUser";

const useUser = () => {
  const [user, setUser] = useState<IUser | null>(storageManager.get(userKey));

  const navigate = useNavigate();

  const login = (user: IUser) => {
    setUser(user);
    storageManager.set(userKey, user);
    navigate(ROUTES.HOME);
  };

  const logout = () => {
    setUser(null);
    storageManager.clear(userKey);
    navigate(ROUTES.LOGIN);
  };

  return {
    user,
    login,
    logout,
    setUser,
  };
};

export default useUser;
