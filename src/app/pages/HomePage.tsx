import useAuthGuard from 'app/hooks/useAuthGuard';
/* eslint-disable */

export const HomePage = () => {
  useAuthGuard(true);
  return <h1>HomePage</h1>;
};
