import { IGenre } from 'app/types/IGenre';
import { IUser } from 'app/types/IUser';
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
  Stack,
  ListItem,
  Button,
} from '@mui/material';
import { VoteMovieComponent } from './VoteMovieComponent';
import { MovieViewsComponent } from './MovieViewsComponent';
import { isObjOfType } from 'app/utils/typeCheckers';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import useCheckLocation from 'app/hooks/useCheckLocation';

type Props = {
  authUser: IUser;
  movieId: string;
  title: string;
  description: string;
  coverImage: string;
  genres: IGenre[];
  likes: string[];
  dislikes: string[];
  views: string;
  multiView: boolean;
  trunctate: undefined | ((sentences: string) => string);
  showMovieDesc: undefined | ((movieId: string) => void);
  checkIfDescShow: undefined | ((movieId: string) => boolean);
};

function checkIfMovieWatched(movieId: string, user: IUser) {
  for (let i = 0; i < user?.watchedMovies.length; i++) {
    if (movieId === user.watchedMovies[i]) return true;
  }
  return false;
}

export const MovieDetailsComponent = ({
  authUser,
  movieId,
  title,
  description,
  coverImage,
  genres,
  likes,
  dislikes,
  views,
  multiView,
  trunctate,
  showMovieDesc,
  checkIfDescShow,
}: Props) => {
  const isWatched = checkIfMovieWatched(movieId, authUser);
  const currentPath = useCheckLocation(`/movies/${movieId}`);

  useEffect(() => {
    if (currentPath) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPath]);

  return (
    <Card
      sx={{
        marginTop: 5,
        marginBottom: 5,
        boxShadow: 3,
      }}
      style={{ backgroundColor: '#fbfbfb' }}
    >
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <CardMedia
            component="img"
            alt={`${title} - movie cover`}
            image={coverImage}
          />
        </Grid>
        <Grid item xs={8}>
          <CardContent>
            <Stack spacing={0}>
              <ListItem>
                <Grid item xs={11}>
                  <Typography variant="h3" gutterBottom>
                    {multiView ? (
                      <Link
                        to={`/movies/${movieId}`}
                        style={{ textDecoration: 'none', color: '#2e2e2e' }}
                      >
                        {title}
                      </Link>
                    ) : (
                      <>{title}</>
                    )}
                  </Typography>
                </Grid>
                {isWatched && (
                  <Grid item xs={1}>
                    <Box display="flex" justifyContent="flex-end">
                      <Typography>✅</Typography>
                    </Box>
                  </Grid>
                )}
              </ListItem>
              <ListItem>
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <VoteMovieComponent
                      likes={likes}
                      dislikes={dislikes}
                      movieId={movieId}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Box display="flex" justifyContent="flex-end">
                      <MovieViewsComponent movieId={movieId} views={views} />
                    </Box>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="justify"
                >
                  {checkIfDescShow && checkIfDescShow(movieId)
                    ? description
                    : trunctate && trunctate(description)}
                  {!multiView && <>{description}</>}
                </Typography>
              </ListItem>
              {multiView && showMovieDesc && (
                <ListItem>
                  <Button onClick={() => showMovieDesc(movieId)}>
                    {checkIfDescShow && checkIfDescShow(movieId)
                      ? 'Show Less'
                      : 'Show More'}
                  </Button>
                </ListItem>
              )}
              <ListItem>
                <Stack direction="row" spacing={2}>
                  {isObjOfType<IGenre[]>(genres) &&
                    genres.map((genre, i) => (
                      <Typography key={i}>{genre.name}</Typography>
                    ))}
                </Stack>
              </ListItem>
            </Stack>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};
