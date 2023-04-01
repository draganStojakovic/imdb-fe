import { useLocation } from 'react-router-dom';

function useCheckLocation(path: string) {
  const location = useLocation();
  if (path === location.pathname) return true;
  return false;
}

export default useCheckLocation;
