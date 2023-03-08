import useAuthGuard from 'app/hooks/useAuthGuard';

export const CreateMoviePage = () => {
  useAuthGuard(true);
  return <h1>CreateMoviePage</h1>;
};
