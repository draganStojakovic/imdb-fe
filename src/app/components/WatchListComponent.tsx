import { Box, Button } from '@mui/material';
import useWatchList from 'app/hooks/useWatchList';

type Props = {
  isOnWatchList: boolean;
  movieId: string;
};

export const WatchListComponent = ({ isOnWatchList, movieId }: Props) => {
  const { addOrRemoveFromWatchList } = useWatchList();

  return (
    <Box sx={{ display: 'inline-flex', gap: '1rem' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
        }}
      >
        <Button
          type="button"
          sx={{ borderRadius: 20 }}
          size="small"
          color={isOnWatchList ? 'success' : 'primary'}
          variant={isOnWatchList ? 'outlined' : 'contained'}
          onClick={() => addOrRemoveFromWatchList(movieId)}
        >
          {isOnWatchList ? 'Remove from watch list' : 'Add to Watch List'}
        </Button>
      </Box>
    </Box>
  );
};
