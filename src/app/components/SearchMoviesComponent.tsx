import { TextField, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const SearchMoviesComponent = () => {
  const navigate = useNavigate();

  function handleChange(value: string) {
    const searchQuery = new URLSearchParams(window.location.search);
    searchQuery.set('search', String(value));
    const newRelativePathQuery =
      window.location.pathname + '?' + searchQuery.toString();
    navigate(newRelativePathQuery);
  }

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
          handleChange(e.target.value);
        }}
      />
    </Grid>
  );
};
