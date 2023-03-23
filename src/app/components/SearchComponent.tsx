import { TextField, Grid } from '@mui/material';
import { useContext } from 'react';
import { MovieParamsContext } from 'app/context/MovieParamsContext';
import { useDebouncedEffect } from 'app/hooks/useDebouncedEffect';
import { useState, useEffect } from 'react';

export const SearchComponent = () => {
  const { setSearch, setPage } = useContext(MovieParamsContext);
  const [searchedTerm, setSearchedTerm] = useState<string | undefined>(
    undefined
  );

  const debouncedSearchTerm = useDebouncedEffect(searchedTerm, 750);

  useEffect(() => {
    setPage(1);
    if (
      typeof debouncedSearchTerm === 'string' &&
      debouncedSearchTerm.length === 0
    ) {
      setSearch('');
    } else if (
      typeof debouncedSearchTerm === 'string' &&
      debouncedSearchTerm.length >= 1
    ) {
      setSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

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
        label="search..."
        type="text"
        onChange={(e) => {
          setSearchedTerm(e.target.value);
        }}
      />
    </Grid>
  );
};
