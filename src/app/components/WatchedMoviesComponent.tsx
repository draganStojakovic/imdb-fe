import { Box, Button } from '@mui/material';
import useWatchedMovie from 'app/hooks/useWatchedMovie';

type Props = {
  isWatched: boolean;
  movieId: string;
};

export const WatchedMoviesComponent = ({ isWatched, movieId }: Props) => {
  const { watchedMovie } = useWatchedMovie();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        marginRight: '1rem',
      }}
    >
      <Button
        type="button"
        sx={{ borderRadius: 20 }}
        size="small"
        variant={isWatched ? 'outlined' : 'contained'}
        color={isWatched ? 'success' : 'primary'}
        onClick={() => {
          watchedMovie(movieId);
        }}
      >
        {isWatched ? 'Remove from watched' : 'Add as watched'}
      </Button>
    </Box>
  );
};
