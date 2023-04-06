import useAuthGuard from 'app/hooks/useAuthGuard';
import { useEffect, useContext, useState } from 'react';
import { LoadingContext } from 'app/context/LoadingContext';
import { PaginationComponent } from 'app/components/PaginationComponent';
import { Container, Box, Grid } from '@mui/material';
import { SearchComponent } from 'app/components/SearchComponent';
import { FilterGenresComponent } from 'app/components/FilterGenresComponent';
import { MovieParamsContext } from 'app/context/MovieParamsContext';
import { MessageComponent } from 'app/components/MessageComponent';
import { returnObject, isObjOfType } from 'app/utils/typeCheckers';
import { IMoviePaginated } from 'app/types/IMovies';
import { MovieDetailsComponent } from 'app/components/MovieDetailsComponent';
import useMovies from 'app/hooks/useMovies';

function trunctate(sentences: string) {
  if (sentences.length > 30) {
    const trunctated = sentences.split('.');
    return String(trunctated[0] + trunctated[1] + trunctated[2] + '...');
  }
  return sentences;
}

export const MoviesPage = () => {
  useAuthGuard(true);

  const [showDesc, setShowDesc] = useState<string[]>([]);
  const { getMovies } = useMovies();

  const { search, genres, page } = useContext(MovieParamsContext);
  const { setLoading } = useContext(LoadingContext);

  const {
    data: moviesPaginated,
    isLoading,
    refetch: reloadMovies,
  } = getMovies(page, 10, search, genres);

  useEffect(() => {
    reloadMovies();
  }, [page, search, genres]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  function checkIfDescShow(movieId: string) {
    for (let i = 0; i < showDesc.length; i++) {
      if (showDesc[i] === movieId) {
        return true;
      }
    }
    return false;
  }

  function showMovieDesc(movieId: string) {
    const isShown = checkIfDescShow(movieId);
    if (isShown) {
      const newListOfShowDescs = showDesc.filter((id) => id !== movieId);
      setShowDesc(newListOfShowDescs);
      return;
    }
    setShowDesc([...showDesc, movieId]);
  }

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
          returnObject<IMoviePaginated>(moviesPaginated) &&
          moviesPaginated.movies.length === 0 && (
            <MessageComponent message="no movies found" />
          )}
        {isObjOfType<IMoviePaginated>(moviesPaginated) &&
          returnObject<IMoviePaginated>(moviesPaginated) &&
          moviesPaginated.currentPage === page &&
          moviesPaginated.movies.map((movie, i) => (
            <MovieDetailsComponent
              key={i}
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
          returnObject<IMoviePaginated>(moviesPaginated) &&
          moviesPaginated.movies.length > 0 && (
            <PaginationComponent count={moviesPaginated?.totalPages} />
          )}
      </Box>
    </Container>
  );
};
