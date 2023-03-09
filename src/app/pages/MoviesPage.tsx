import useAuthGuard from 'app/hooks/useAuthGuard';
import useMovies from 'app/hooks/useMovies';
import { Container, Box, Typography, Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const MoviesPage = () => {
  useAuthGuard(true);
  const { getMovies } = useMovies();
  const movies = getMovies();
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
        {movies &&
          movies.map((movie) => (
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
                          {showMoreDesc == movie.id ? 'Show Less' : 'Show More'}
                        </Button>
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Box>
            </Grid>
          ))}
      </Box>
    </Container>
  );
};
