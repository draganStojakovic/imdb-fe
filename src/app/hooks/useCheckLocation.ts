import { useLocation } from 'react-router-dom';

function useCheckLocation(path: string): boolean {
  const location = useLocation();
  return path === location.pathname;
}

export default useCheckLocation;
