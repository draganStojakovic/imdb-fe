import useAuthGuard from 'app/hooks/useAuthGuard';
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { LoadingContext } from 'app/context/LoadingContext';
import { useGetMoviesQuerry } from 'app/querries/movie.querry';
import { PaginationComponent } from 'app/components/PaginationComponent';
import { Container, Box, Typography, Grid, Stack, Button } from '@mui/material';
import { SearchComponent } from 'app/components/SearchComponent';
import { FilterGenresComponent } from 'app/components/FilterGenresComponent';
import { MovieParamsContext } from 'app/context/MovieParamsContext';
import { VoteMovieComponent } from 'app/components/VoteMovieComponent';
import { MovieViewsComponent } from 'app/components/MovieViewsComponent';
import { NoContentFoundComponent } from 'app/components/NoContentFoundComponent';
import { returnObject, isObjOfType } from 'app/utils/typeCheckers';
import { IMoviePaginated } from 'app/types/IMovies';

export const MoviesPage = () => {
  useAuthGuard(true);

  const { search, genres, page } = useContext(MovieParamsContext);
  const { setLoading } = useContext(LoadingContext);
  const [showMoreDesc, setShowMoreDesc] = useState<string | undefined>(
    undefined
  );

  const {
    data: moviesPaginated,
    isLoading,
    refetch: reloadMovies,
  } = useGetMoviesQuerry(page, 10, search, genres);

  useEffect(() => {
    reloadMovies();
  }, [page, search, genres]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

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
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
        }}
      >
        <Box sx={{ display: 'inline-flex', gap: '1rem' }}>
          <SearchComponent />
          <FilterGenresComponent />
        </Box>
        {isObjOfType<IMoviePaginated>(moviesPaginated) &&
          returnObject<IMoviePaginated>(moviesPaginated) &&
          moviesPaginated.movies.length === 0 && (
            <NoContentFoundComponent message="No movies found" />
          )}
        {isObjOfType<IMoviePaginated>(moviesPaginated) &&
          returnObject<IMoviePaginated>(moviesPaginated) &&
          moviesPaginated.currentPage === page &&
          moviesPaginated.movies.map((movie, i) => (
            <Grid item sm={12} key={i}>
              <Typography variant="h3" gutterBottom>
                <Link
                  to={`/movies/${movie.id}`}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  {movie.title}
                </Link>
              </Typography>
              <Box sx={{ display: 'inline-flex', gap: '1rem' }}>
                <VoteMovieComponent
                  likes={movie.likes}
                  dislikes={movie.dislikes}
                  movieId={movie.id}
                />
                <MovieViewsComponent movieId={movie.id} views={movie.views} />
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
                    marginBottom: 5,
                  }}
                  src={movie.coverImage}
                />
                <Stack spacing={2}>
                  {showMoreDesc == movie.id
                    ? movie.description
                    : trunctate(movie.description)}
                  <Button
                    color="inherit"
                    onClick={() => {
                      if (showMoreDesc === movie.id) {
                        setShowMoreDesc(undefined);
                      } else if (!showMoreDesc) {
                        setShowMoreDesc(movie.id);
                      }
                    }}
                  >
                    {showMoreDesc == movie.id ? 'Show Less' : 'Show More'}
                  </Button>
                </Stack>
              </Box>
            </Grid>
          ))}
        <Grid container spacing={1}>
          {isObjOfType<IMoviePaginated>(moviesPaginated) &&
            returnObject<IMoviePaginated>(moviesPaginated) &&
            moviesPaginated.movies.length > 0 && (
              <PaginationComponent count={moviesPaginated?.totalPages} />
            )}
        </Grid>
      </Box>
    </Container>
  );
};
