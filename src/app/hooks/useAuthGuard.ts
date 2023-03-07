import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "app/utils/static";
import { UserContext } from "app/context/UserContext";

const useAuthGuard = (auth: boolean) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth && !user) {
      navigate(ROUTES.LOGIN);
    } else if (!auth && user) {
      navigate(ROUTES.HOME);
    }
  });
};

export default useAuthGuard;
