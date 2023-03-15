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
      const pageQuery = getQueryParams();
      pageQuery.set('page', String(value));
      const newRelativePathQuery =
        window.location.pathname + '?' + pageQuery.toString();
      navigate(newRelativePathQuery);
      return value;
    },
    [query]
  );

  const getQueryParams = () => {
    return new URLSearchParams(window.location.search);
  };

  const checkIfQueryExists = (value: string) => {
    const url = new URL(window.location.href);
    if (url.searchParams.has(value)) {
      return true;
    }

    return false;
  };

  return { getPage, getSearch, setPage, getQueryParams, checkIfQueryExists };
};

export default useQueryParams;
