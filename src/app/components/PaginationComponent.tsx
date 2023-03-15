import { Pagination, Stack } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useQueryParams from 'app/hooks/useQueryParams';

type Props = {
  count: number;
};

export const PaginationComponent = ({ count }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getPage } = useQueryParams();
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    setCurrentPage(getPage());
  }, [location.search]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    const pageQuery = new URLSearchParams(window.location.search);
    pageQuery.set('page', String(value));
    const newRelativePathQuery =
      window.location.pathname + '?' + pageQuery.toString();
    navigate(newRelativePathQuery);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Stack
      spacing={2}
      sx={{
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        marginTop: '5rem',
        marginBottom: '1rem',
      }}
    >
      <Pagination count={count} page={currentPage} onChange={handleChange} />
    </Stack>
  );
};
