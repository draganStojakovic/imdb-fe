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
  isWatched: boolean;
  movieId: string;
};

export const WatchedMoviesComponent = ({ isWatched, movieId }: Props) => {
  const { refresh } = useContext(UserContext);

  const { mutate } = useMutation(moviesService.WatchedMovie, {
    onSuccess: (data: AxiosResponse<IUser>) => {
      if (isObjOfType<IUser>(data)) refresh(data);
    },
    onError: () => {
      notficationManager.error(
        'Something went wrong, please refresh the page and try again.'
      );
    },
  });

  async function voteMovie(data: string) {
    mutate(data);
  }

  return (
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
        variant={isWatched ? 'outlined' : 'contained'}
        color={isWatched ? 'success' : 'primary'}
        onClick={() => {
          voteMovie(movieId);
        }}
      >
        {isWatched ? 'Remove from watched' : 'Add as watched'}
      </Button>
    </Box>
  );
};
