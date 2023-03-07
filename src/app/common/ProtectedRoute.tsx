import { Navigate } from "react-router-dom";

type Props = {
  children: any;
  isAuth: boolean;
};

export const ProtectedRoute = ({ isAuth, children }: Props) => {
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
