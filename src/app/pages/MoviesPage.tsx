import useAuthGuard from 'app/hooks/useAuthGuard';
import { useEffect, useContext, useState, useCallback } from 'react';
import { LoadingContext } from 'app/context/LoadingContext';
import { UserContext } from 'app/context/UserContext';
import { PaginationComponent } from 'app/components/PaginationComponent';
import { Container, Box, Grid } from '@mui/material';
import { SearchComponent } from 'app/components/SearchComponent';
import { FilterGenresComponent } from 'app/components/FilterGenresComponent';
import { MovieParamsContext } from 'app/context/MovieParamsContext';
import { MessageComponent } from 'app/components/MessageComponent';
import { isObjOfType } from 'app/utils/typeCheckers';
import { IMoviePaginated, IMovieStrippedDown } from 'app/types/IMovies';
import { MovieDetailsComponent } from 'app/components/MovieDetailsComponent';
import useMovies from 'app/hooks/useMovies';
import { IUser } from 'app/types/IUser';
import { ListMoviesComponent } from 'app/components/ListMoviesComponent';

export const MoviesPage = () => {
  useAuthGuard(true);

  const [showDesc, setShowDesc] = useState<string[]>([]);
  const { getMovies, getPopularMovies } = useMovies();

  const { search, genres, page } = useContext(MovieParamsContext);
  const { setLoading } = useContext(LoadingContext);
  const { user } = useContext(UserContext);

  const {
    data: moviesPaginated,
    isLoading,
    refetch: reloadMovies,
  } = getMovies(page, 10, search, genres);

  const { data: popularMovies } = getPopularMovies();

  useEffect(() => {
    reloadMovies();
  }, [page, search, genres]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  const trunctate = useCallback((sentences: string) => {
    if (sentences.length > 120) {
      const splitted = sentences.split('');
      let trunctated = '';
      for (let i = 0; i < 120; i++) {
        trunctated += splitted[i];
      }
      return trunctated + '...';
    }
    return sentences;
  }, []);

  const checkIfDescShow = useCallback(
    (movieId: string) => {
      for (let i = 0; i < showDesc.length; i++) {
        if (showDesc[i] === movieId) return true;
      }
      return false;
    },
    [showDesc]
  );

  const showMovieDesc = useCallback(
    (movieId: string) => {
      if (checkIfDescShow(movieId)) {
        setShowDesc((prevState) => prevState.filter((id) => id !== movieId));
        return;
      }
      setShowDesc((prevState) => [...prevState, movieId]);
    },
    [checkIfDescShow, setShowDesc]
  );

  return (
    <Container component="main" maxWidth="xl">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <SearchComponent />
          </Grid>
          <Grid item xs={8}>
            <FilterGenresComponent />
          </Grid>
        </Grid>
        {isObjOfType<IMoviePaginated>(moviesPaginated) &&
          moviesPaginated.movies.length === 0 && (
            <MessageComponent message="no movies found" />
          )}
        {isObjOfType<IMoviePaginated>(moviesPaginated) &&
          moviesPaginated.movies.length !== 0 &&
          isObjOfType<IMovieStrippedDown[]>(popularMovies) && (
            <ListMoviesComponent
              movies={popularMovies}
              caption="Popular movies:"
            />
          )}
        {isObjOfType<IMoviePaginated>(moviesPaginated) &&
          isObjOfType<IUser>(user) &&
          moviesPaginated.currentPage === page &&
          moviesPaginated.movies.map((movie) => (
            <MovieDetailsComponent
              key={movie.id}
              authUser={user}
              movieId={movie.id}
              title={movie.title}
              description={movie.description}
              coverImage={movie.coverImage}
              genres={movie.genres}
              likes={movie.likes}
              dislikes={movie.dislikes}
              views={movie.views}
              multiView={true}
              trunctate={trunctate}
              showMovieDesc={showMovieDesc}
              checkIfDescShow={checkIfDescShow}
            />
          ))}
        {isObjOfType<IMoviePaginated>(moviesPaginated) &&
          moviesPaginated.movies.length > 0 && (
            <PaginationComponent count={moviesPaginated?.totalPages} />
          )}
      </Box>
    </Container>
  );
};
