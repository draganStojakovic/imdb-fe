import { Typography, Grid, Box, ListItem, Container } from '@mui/material';
import useAuthGuard from 'app/hooks/useAuthGuard';
import useMovies from 'app/hooks/useMovies';
import { useContext, useEffect } from 'react';
import { LoadingContext } from 'app/context/LoadingContext';
import { UserContext } from 'app/context/UserContext';
import { isObjOfType } from 'app/utils/typeCheckers';
import { IMovieWatchList } from 'app/types/IMovies';
import { SimpleMovieCardComponent } from 'app/components/SimpleMovieCardComponent';
import useWatchList from 'app/hooks/useWatchList';
import { IUser } from 'app/types/IUser';
import useWatchedMovie from 'app/hooks/useWatchedMovie';
import { MessageComponent } from 'app/components/MessageComponent';

export const WatchListPage = () => {
  useAuthGuard(true);
  const { getAllMoviesFromWatchList } = useMovies();
  const { addOrRemoveFromWatchList } = useWatchList();
  const { watchedMovie } = useWatchedMovie();
  const { user } = useContext(UserContext);
  const { setLoading } = useContext(LoadingContext);

  const {
    data: movies,
    refetch: refetchMovies,
    isLoading,
  } = getAllMoviesFromWatchList();

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    refetchMovies();
  }, [user]);

  return (
    <Container component="main" maxWidth="xl">
      <Box
        sx={{
          marginTop: '3rem',
          marginBottom: '3rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ marginBottom: '3rem' }}>
          {`${user?.fname} ${user?.lname}'s watch list`}
        </Typography>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {isObjOfType<IUser>(user) &&
          isObjOfType<IMovieWatchList[]>(movies) &&
          movies.length !== 0 ? (
            movies.map((movie) => (
              <Grid item xs={2} sm={4} md={4} key={movie._id}>
                <ListItem>
                  <SimpleMovieCardComponent
                    authUser={user}
                    movieId={movie._id}
                    title={movie.title}
                    coverImage={movie.coverImage}
                    addOrRemoveFromWatchList={addOrRemoveFromWatchList}
                    watchedMovie={watchedMovie}
                  />
                </ListItem>
              </Grid>
            ))
          ) : (
            <MessageComponent message={'Watch list is empty'} />
          )}
        </Grid>
      </Box>
    </Container>
  );
};
