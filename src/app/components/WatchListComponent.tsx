import { Box, Button } from '@mui/material';
import { useMutation } from 'react-query';
import { moviesService } from 'app/services/movies.service';
import { IUser } from 'app/types/IUser';
import { AxiosResponse } from 'axios';
import { notficationManager } from 'app/utils/NotificationManager';
import { useContext } from 'react';
import { UserContext } from 'app/context/UserContext';
import { isObjOfType } from 'app/utils/typeCheckers';

type Props = {
  isOnWatchList: boolean;
  movieId: string;
};

export const WatchListComponent = ({ isOnWatchList, movieId }: Props) => {
  const { refresh } = useContext(UserContext);

  const { mutate } = useMutation(moviesService.WatchList, {
    onSuccess: (data: AxiosResponse<IUser>) => {
      if (isObjOfType<IUser>(data)) refresh(data);
    },
    onError: () => {
      notficationManager.error(
        'Something went wrong, please refresh the page and try again.'
      );
    },
  });

  async function addOrRemoveFromWatchList(data: string) {
    mutate(data);
  }

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
