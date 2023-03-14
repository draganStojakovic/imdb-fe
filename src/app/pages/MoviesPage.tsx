import useAuthGuard from 'app/hooks/useAuthGuard';
import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { LoadingContext } from 'app/context/LoadingContext';
import { useGetMoviesQuerry } from 'app/querries/movie.querry';
import { PaginationComponent } from 'app/components/PaginationComponent';
import { isMoviesPaginated } from 'app/utils/typeCheckers';
import { Container, Box, Typography, Grid, Stack, Button } from '@mui/material';
import { SearchMoviesComponent } from 'app/components/SearchMoviesComponent';
import useQueryParams from 'app/hooks/useQueryParams';

export const MoviesPage = () => {
  useAuthGuard(true);
  const location = useLocation();
  const { getPage, getSearch, setPage } = useQueryParams();

  const [currentPage, setCurrentPage] = useState<number>(getPage());
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);

  const { setLoading } = useContext(LoadingContext);

  const {
    data: moviesPaginated,
    isLoading,
    refetch: reloadMovies,
  } = useGetMoviesQuerry(currentPage, searchTerm);

  useEffect(() => {
    setPage();
  }, []);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    setCurrentPage(getPage());
    const search = getSearch();
    if (search) {
      const pageQuery = setPage();
      setCurrentPage(pageQuery);
      setSearchTerm(search);
    }
  }, [location.search]);

  useEffect(() => {
    reloadMovies();
  }, [currentPage, searchTerm]);

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
        <SearchMoviesComponent />
        {isMoviesPaginated(moviesPaginated) &&
          moviesPaginated.movies.map((movie, i) => (
            <Grid item sm={12} key={i}>
              <Typography
                variant="h3"
                gutterBottom
                sx={{
                  marginBottom: '1rem',
                }}
              >
                <Link
                  to={`/movies/${movie.id}`}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  {movie.title}
                </Link>
              </Typography>
              <Box sx={{ display: 'inline-flex', gap: '1rem' }}>
                {movie &&
                  movie.genres.map((genre, i) => (
                    <Typography
                      sx={{
                        marginBottom: '1rem',
                      }}
                      variant="button"
                      display="block"
                      gutterBottom
                      key={i}
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
          {isMoviesPaginated(moviesPaginated) && (
            <PaginationComponent count={moviesPaginated?.totalPages} />
          )}
        </Grid>
      </Box>
    </Container>
  );
};
