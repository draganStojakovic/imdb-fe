import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const useQueryParams = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const getPage = useCallback(() => {
    let page = Number(query.get('page'));
    if (page === 0) page = 1;
    return page;
  }, [query]);

  const getSearch = useCallback(() => {
    const search = query.get('search');
    if (search) {
      return String(search);
    }
    return undefined;
  }, [query]);

  return { getPage, getSearch };
};

export default useQueryParams;
