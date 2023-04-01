import { useLocation } from 'react-router-dom';

function useCheckLocation(location: string) {
  const currentPath = useLocation();
  if (location === currentPath.pathname) return true;
  return false;
}

export default useCheckLocation;
