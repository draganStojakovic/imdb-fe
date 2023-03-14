import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const useQueryParams = () => {
  const navigate = useNavigate();
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

  const setPage = useCallback(
    (value = 1) => {
      const pageQuery = new URLSearchParams(window.location.search);
      pageQuery.set('page', String(value));
      const newRelativePathQuery =
        window.location.pathname + '?' + pageQuery.toString();
      navigate(newRelativePathQuery);
      return value;
    },
    [query]
  );

  return { getPage, getSearch, setPage };
};

export default useQueryParams;
