import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Divider,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { checkIfMovieWatched } from './MovieDetailsComponent';
import { IUser } from 'app/types/IUser';

type Props = {
  authUser: IUser;
  movieId: string;
  title: string;
  coverImage: string;
  addOrRemoveFromWatchList: (data: string) => Promise<void>;
  watchedMovie: (data: string) => Promise<void>;
};

export const SimpleMovieCardComponent = ({
  authUser,
  movieId,
  title,
  coverImage,
  addOrRemoveFromWatchList,
  watchedMovie,
}: Props) => {
  const isWatched = checkIfMovieWatched(movieId, authUser);

  return (
    <Card
      sx={{
        maxWidth: 350,
        margin: '0 auto',
        padding: '0.1em',
      }}
    >
      <Link
        to={`/movies/${movieId}`}
        style={{ textDecoration: 'none', color: '#2e2e2e' }}
      >
        <CardMedia
          component="img"
          alt={`${title} - movie cover`}
          image={coverImage}
          height="400"
        />
        <CardContent>
          <Typography variant="h5">{title}</Typography>
        </CardContent>
      </Link>
      <Divider />
      {isWatched && (
        <Box>
          <CardContent>
            <Typography variant="body1">
              {"You've watched this movie!"}
            </Typography>
          </CardContent>
          <Divider />
        </Box>
      )}
      <CardActions>
        <Button
          variant="contained"
          size="small"
          onClick={() => addOrRemoveFromWatchList(movieId)}
        >
          Remove
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={() => watchedMovie(movieId)}
        >
          {isWatched ? 'Unmark watched' : 'Mark watched'}
        </Button>
      </CardActions>
    </Card>
  );
};
