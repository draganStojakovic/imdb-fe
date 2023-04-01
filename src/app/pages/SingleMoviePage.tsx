import { useParams } from 'react-router-dom';
import useAuthGuard from 'app/hooks/useAuthGuard';
import useMovies from 'app/hooks/useMovies';
import { Container, Box } from '@mui/material';
import { MovieDetailsComponent } from 'app/components/MovieDetailsComponent';

export const SingleMoviePage = () => {
  useAuthGuard(true);
  const { getSingleMovie } = useMovies();
  const { id } = useParams();

  const movie = getSingleMovie(id as string);

  return (
    <Container component="main" maxWidth="xl">
      <Box
        sx={{
          marginTop: 8,
        }}
      >
        {movie && (
          <MovieDetailsComponent
            movieId={movie.id}
            title={movie.title}
            description={movie.description}
            coverImage={movie.coverImage}
            genres={movie.genres}
            likes={movie.likes}
            dislikes={movie.dislikes}
            views={movie.views}
            multiView={false}
            trunctate={undefined}
            showMovieDesc={undefined}
            checkIfDescShow={undefined}
          />
        )}
      </Box>
    </Container>
  );
};
