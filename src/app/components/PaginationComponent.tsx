import { Pagination, Stack } from '@mui/material';
import { useContext } from 'react';
import { MovieParamsContext } from 'app/context/MovieParamsContext';

type Props = {
  count: number;
};

export const PaginationComponent = ({ count }: Props) => {
  const { page, setPage } = useContext(MovieParamsContext);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Stack
      spacing={2}
      sx={{
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'left',
        marginBottom: '2rem',
        marginTop: '3rem',
      }}
    >
      <Pagination count={count} page={page} onChange={handleChange} />
    </Stack>
  );
};
