import useAuthGuard from 'app/hooks/useAuthGuard';
import { useState, useEffect } from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import { SearchOMDbComponent } from 'app/components/SearchOMDbComponent';
import { isOMDbError, isObjOfType } from 'app/utils/typeCheckers';
import { IMovieOMdb } from 'app/types/IMovies';
import { OMDbMovieDetails } from 'app/components/OMDbMovieDetails';
import { MessageComponent } from 'app/components/MessageComponent';
import { Link } from 'react-router-dom';
import { ROUTES } from 'app/utils/static';
import useGetOMDbMovie from 'app/hooks/useGetOMDbMovie';

export const OMDbPage = () => {
  useAuthGuard(true);

  const [searchTerm, setSearchTerm] = useState('');
  const { data: movie, error, nullifyState } = useGetOMDbMovie(searchTerm);

  useEffect(() => {
    if (searchTerm.length !== 0) {
      nullifyState();

      searchTerm.includes(' ') &&
        setSearchTerm((prevState) => prevState.replace(/ /g, '+'));
    }
  }, [searchTerm]);

  return (
    <Container component="main" maxWidth="xl">
      <Box
        sx={{
          marginTop: '3rem',
          marginBottom: '1rem',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Typography variant="h3">OMDb</Typography>
          </Grid>
          <Grid item xs={10}>
            <SearchOMDbComponent setSearchTerm={setSearchTerm} />
            <Box sx={{ marginTop: '1rem' }}>
              <Link
                to={ROUTES.MOVIES_CREATE_MANUAL}
                style={{ textDecoration: 'none', color: 'blue' }}
              >
                Enter movie details manually
              </Link>
            </Box>
          </Grid>
        </Grid>
        {isObjOfType<IMovieOMdb>(movie) && (
          <OMDbMovieDetails omdbMovie={movie} />
        )}
        {isOMDbError(error) && error.Response === 'False' && (
          <Box sx={{ marginTop: '3rem' }}>
            <MessageComponent message={error.Error} />
          </Box>
        )}
      </Box>
    </Container>
  );
};
