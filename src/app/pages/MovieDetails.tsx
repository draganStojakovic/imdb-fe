import { useParams } from 'react-router-dom';
import useAuthGuard from 'app/hooks/useAuthGuard';
import useMovies from 'app/hooks/useMovies';
import { Container, Box, Typography, Grid } from '@mui/material';
import { VoteMovieComponent } from 'app/components/VoteMovieComponent';
import { MovieViewsComponent } from 'app/components/MovieViewsComponent';

export const MovieDetails = () => {
  useAuthGuard(true);
  const { getSingleMovie } = useMovies();
  const { id } = useParams();

  const movie = getSingleMovie(id as string);

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
        <Grid container spacing={1}>
          <Grid item sm={12}>
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                marginBottom: '1rem',
              }}
            >
              {movie && movie.title}
            </Typography>
            <Box sx={{ display: 'inline-flex', gap: '1rem' }}>
              {movie && (
                <VoteMovieComponent
                  likes={movie?.likes}
                  dislikes={movie?.dislikes}
                  movieId={movie?.id}
                />
              )}
              <MovieViewsComponent movieId={id} views={movie?.views} />
              {movie &&
                movie.genres.map((genre, i) => (
                  <Typography
                    sx={{
                      marginBottom: '1rem',
                    }}
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}
                  >
                    {genre.name}
                  </Typography>
                ))}
            </Box>
            <Box sx={{ display: 'inline-flex', gap: '1rem' }}>
              <Box
                component="img"
                sx={{
                  height: 350,
                }}
                src={movie && movie.coverImage}
              />
              <Box sx={{ flexDirection: 'column' }}>
                <Typography
                  sx={{
                    marginBottom: 5,
                  }}
                >
                  {movie && movie.description}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
