import useAuthGuard from "app/hooks/useAuthGuard";

export const HomePage = () => {
  useAuthGuard(true);
  return <h1>HomePage</h1>;
};
