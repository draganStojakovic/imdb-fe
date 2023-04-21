import { Button, Box } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from 'app/context/UserContext';
import { useMutation } from 'react-query';
import { moviesService } from 'app/services/movies.service';
import { AxiosError, AxiosResponse } from 'axios';
import { isObjOfType } from 'app/utils/typeCheckers';
import { IVoteMoviePayload } from 'app/types/IMovies';
import { IError } from 'app/types/IError';
import { IVote } from 'app/types/IVote';
import { IUser } from 'app/types/IUser';
import { notficationManager } from 'app/utils/NotificationManager';

type Props = {
  likes: string[];
  dislikes: string[];
  movieId: string;
};

function getCount(arr: string[]): number {
  return arr.length;
}

function findUserIdIndex(votes: string[], user: IUser): number {
  return votes.findIndex((item) => {
    item === user?.id;
  });
}

function handleVotes(
  data: IVote,
  user: IUser,
  likes: string[],
  dislikes: string[]
) {
  const { like, dislike } = data;

  if (like === 'added' && dislike === null) {
    user && likes.push(user.id);
    return;
  }

  if (like === 'removed' && dislike === null) {
    const i = findUserIdIndex(likes, user);
    likes.splice(i, 1);
    return;
  }

  if (like === 'removed' && dislike === 'added') {
    const i = findUserIdIndex(likes, user);
    likes.splice(i, 1);
    user && dislikes.push(user.id);
    return;
  }

  if (like === null && dislike === 'added') {
    user && dislikes.push(user.id);
    return;
  }

  if (like === null && dislike === 'removed') {
    const i = findUserIdIndex(dislikes, user);
    dislikes.splice(i, 1);
    return;
  }

  if (like === 'added' && dislike === 'removed') {
    const i = findUserIdIndex(dislikes, user);
    dislikes.splice(i, 1);
    user && likes.push(user.id);
    return;
  }
}

function checkIfVoted(arr: string[], user: IUser): boolean {
  for (let i = 0; i < arr.length; i++) {
    if (user?.id === arr[i]) {
      return true;
    }
  }
  return false;
}

export const VoteMovieComponent = ({ likes, dislikes, movieId }: Props) => {
  const { user } = useContext(UserContext);

  const { mutate } = useMutation(moviesService.VoteMovie, {
    onSuccess: (data: AxiosResponse<IVote>) => {
      isObjOfType<IVote>(data) &&
        isObjOfType<IUser>(user) &&
        handleVotes(data, user, likes, dislikes);
      notficationManager.success('Voted successfully.');
    },
    onError: (error: AxiosError<IError>) => {
      console.log(error);
      notficationManager.success('Something went wrong.');
    },
  });

  async function voteMovie(data: IVoteMoviePayload) {
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
          variant={
            isObjOfType<IUser>(user) && checkIfVoted(likes, user)
              ? 'contained'
              : 'outlined'
          }
          size="small"
          onClick={() =>
            user &&
            voteMovie({ movieId: movieId, userId: user?.id, button: 'like' })
          }
        >
          👍 | {getCount(likes)}
        </Button>
      </Box>
      <Box
        sx={{
          marginRight: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
        }}
      >
        <Button
          type="button"
          sx={{ borderRadius: 20 }}
          variant={
            isObjOfType<IUser>(user) && checkIfVoted(dislikes, user)
              ? 'contained'
              : 'outlined'
          }
          size="small"
          onClick={() =>
            user &&
            voteMovie({
              movieId: movieId,
              userId: user?.id,
              button: 'dislike',
            })
          }
        >
          👎 | {getCount(dislikes)}
        </Button>
      </Box>
    </Box>
  );
};
