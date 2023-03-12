import { Pagination, Stack } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { ROUTES } from 'app/utils/static';
type Props = {
  count: number;
};

export const PaginationComponent = ({ count }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const getPage = useCallback(() => {
    return Number(location.search.replace('?page=', '')) || 1;
  }, [location.search]);

  useEffect(() => {
    setCurrentPage(getPage);
  }, [getPage, location]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) =>
    navigate(`${ROUTES.MOVIES}/?page=${value}`);

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
