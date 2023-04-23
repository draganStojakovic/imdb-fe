import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Divider,
  Grid,
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
  setMouseOver: React.Dispatch<React.SetStateAction<string>>;
  mouseOver: string;
  checkIfMouseIsOverCard: (
    mousedOverMovieId: string,
    currentMovieId: string
  ) => boolean;
};

export const SimpleMovieCardComponent = ({
  authUser,
  movieId,
  title,
  coverImage,
  addOrRemoveFromWatchList,
  watchedMovie,
  setMouseOver,
  mouseOver,
  checkIfMouseIsOverCard,
}: Props) => {
  const isWatched = checkIfMovieWatched(movieId, authUser);
  const isMoused = checkIfMouseIsOverCard(mouseOver, movieId);

  return (
    <Box sx={{ boxShadow: isMoused ? 3 : 0 }}>
      <Card
        raised
        sx={{
          maxWidth: 350,
          margin: '0 auto',
          padding: '0.1em',
        }}
        onMouseOver={() => setMouseOver(() => movieId)}
        onMouseLeave={() => setMouseOver(() => '')}
      >
        <Link
          to={`/movies/${movieId}`}
          style={{ textDecoration: 'none', color: '#2e2e2e' }}
        >
          <CardMedia
            component="img"
            alt={`${title} - movie cover`}
            image={coverImage}
            height="350"
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <Typography variant="h5">{title}</Typography>
              </Grid>
              <Grid item xs={2}>
                {isWatched && '✅'}
              </Grid>
            </Grid>
          </CardContent>
        </Link>
        <Divider />
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
            {isWatched ? 'Mark not watched' : 'Mark watched'}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
