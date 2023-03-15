import { TextField, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useQueryParams from 'app/hooks/useQueryParams';

export const SearchMoviesComponent = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string | undefined>(undefined);
  const { getQueryParams } = useQueryParams();

  useEffect(() => {
    const handler = setTimeout(() => {
      if (search === '') {
        const searchQuery = getQueryParams();
        searchQuery.delete('search');
        const newRelativePathQuery =
          window.location.pathname + '?' + searchQuery.toString();
        navigate(newRelativePathQuery);
      } else if (search && search?.length > 1) {
        const searchQuery = getQueryParams();
        searchQuery.set('search', String(search));
        const newRelativePathQuery =
          window.location.pathname + '?' + searchQuery.toString();
        navigate(newRelativePathQuery);
      }
    }, 750);

    return () => clearTimeout(handler);
  }, [search]);

  return (
    <Grid
      container
      justifyContent="flex-start"
      maxWidth="sm"
      sx={{
        marginBottom: 5,
      }}
    >
      <TextField
        fullWidth
        label="search movies..."
        type="text"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </Grid>
  );
};
