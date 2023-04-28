import { TextField, Grid } from '@mui/material';
import { useContext } from 'react';
import { MovieParamsContext } from 'app/context/MovieParamsContext';
import { useDebouncedEffect } from 'app/hooks/useDebouncedEffect';
import { useState, useEffect } from 'react';
import { isPrimitiveType } from 'app/utils/typeCheckers';

export const SearchComponent = () => {
  const { setSearch, setPage } = useContext(MovieParamsContext);
  const [searchedTerm, setSearchedTerm] = useState<string>('');

  const debouncedSearchTerm = useDebouncedEffect(searchedTerm, 750);

  useEffect(() => {
    setPage(1);
    if (isPrimitiveType(debouncedSearchTerm, 'string')) {
      debouncedSearchTerm.length === 0
        ? setSearch('')
        : setSearch(debouncedSearchTerm);
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
