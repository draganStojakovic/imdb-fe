import useAuthGuard from 'app/hooks/useAuthGuard';
import { useLocation } from 'react-router-dom';
import { useCallback, useState, useEffect, useContext } from 'react';
import { LoadingContext } from 'app/context/LoadingContext';
import { useGetMoviesQuerry } from 'app/querries/movie.querry';
import { PaginationComponent } from 'app/components/PaginationComponent';
import { isMoviesPaginated } from 'app/utils/typeCheckers';

export const MoviesPage = () => {
  useAuthGuard(true);
  const location = useLocation();
  const getPage = useCallback(() => {
    return Number(location.search.replace('?page=', '')) || 1;
  }, [location.search]);
  const [currentPage, setCurrentPage] = useState<number>(getPage());

  const { setLoading } = useContext(LoadingContext);

  const {
    data: moviesPaginated,
    isLoading,
    refetch: reloadProducts,
  } = useGetMoviesQuerry(currentPage);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    setCurrentPage(getPage());
  }, [getPage, location]);

  useEffect(() => {
    reloadProducts();
  }, [currentPage, reloadProducts]);

  return (
    <h1>
      sudhfkudsfh
      <br />
      {isMoviesPaginated(moviesPaginated) && (
        <PaginationComponent count={moviesPaginated?.totalPages} />
      )}
    </h1>
  );
};
