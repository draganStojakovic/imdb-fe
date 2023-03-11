import useAuthGuard from 'app/hooks/useAuthGuard';
import useMovies from 'app/hooks/useMovies';
import {
  Container,
  Box,
  Typography,
  Grid,
  Button,
  Pagination,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { IMovie } from 'app/types/IMovies';
import { isMoviesPaginated } from 'app/utils/typeCheckers';

export const MoviesPage = () => {
  useAuthGuard(true);
  const { getMovies } = useMovies();
  const response = getMovies();

  const [showMoreDesc, setShowMoreDesc] = useState<string | undefined>(
    undefined
  );

  function trunctate(sentences: string) {
    if (sentences.length > 40) {
      const trunctated = sentences.split('.');
      return String(trunctated[0] + trunctated[1] + trunctated[2] + '...');
    }
    return sentences;
  }

  return (
    <Container component="main" maxWidth="xl">
      <Box
        sx={{
          marginTop: 10,
          marginBottom: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
        }}
      >
        {isMoviesPaginated(response) &&
          response.movies.map((movie: IMovie) => (
            <Grid key={movie.id} container spacing={1}>
              <Box
                sx={{
                  marginBottom: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'left',
                }}
              >
                <Grid item sm={12}>
                  <Typography
                    variant="h3"
                    gutterBottom
                    sx={{
                      marginBottom: 5,
                    }}
                  >
                    <Link
                      style={{ textDecoration: 'none', color: 'black' }}
                      to={`/movies/${movie.id}`}
                    >
                      {movie.title}
                    </Link>
                  </Typography>
                  <Box sx={{ display: 'inline-flex', gap: '1rem' }}>
                    <Box
                      component="img"
                      sx={{
                        height: 250,
                      }}
                      src={movie.coverImage}
                    />
                    <Box sx={{ flexDirection: 'column' }}>
                      <Typography
                        sx={{
                          marginBottom: 5,
                        }}
                      >
                        {showMoreDesc == movie.id
                          ? movie.description
                          : trunctate(movie.description)}
                        <Typography
                          sx={{
                            marginBottom: 5,
                          }}
                        >
                          <Button
                            color="inherit"
                            onClick={() => {
                              if (showMoreDesc) {
                                setShowMoreDesc(undefined);
                              } else {
                                setShowMoreDesc(movie.id);
                              }
                            }}
                          >
                            {showMoreDesc == movie.id
                              ? 'Show Less'
                              : 'Show More'}
                          </Button>
                        </Typography>
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Box>
            </Grid>
          ))}
        {isMoviesPaginated(response) && response.movies.length !== 0 && (
          <Pagination page={2} count={response.totalPages} />
        )}
      </Box>
    </Container>
  );
};
