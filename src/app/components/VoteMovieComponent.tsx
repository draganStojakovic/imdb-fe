import { Typography, Button, Box } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from 'app/context/UserContext';
import { useMutation } from 'react-query';
import { moviesService } from 'app/services/movies.service';
import { AxiosError, AxiosResponse } from 'axios';
import { IVoteMoviePayload } from 'app/types/IMovies';
import { IError } from 'app/types/IError';
import { IVotes } from 'app/types/IVotes';
import { isVotes } from 'app/utils/typeCheckers';

type Props = {
  likes: string[];
  dislikes: string[];
  movieId: string;
};

export const VoteMovieComponent = ({ likes, dislikes, movieId }: Props) => {
  const { user } = useContext(UserContext);

  function getCount(arr: string[]): number {
    return arr.length;
  }

  function checkIfVoted(arr: string[]) {
    for (let i = 0; i < arr.length; i++) {
      if (user?.id === arr[i]) {
        return true;
      }
    }
  }

  function findUserIdIndex(votes: string[]): number {
    return votes.findIndex((item) => {
      item === user?.id;
    });
  }

  function handleVotes(data: IVotes) {
    const { like, dislike } = data;

    if (like === 'added' && dislike === null) {
      user && likes.push(user.id);
      return;
    }

    if (like === 'removed' && dislike === null) {
      const i = findUserIdIndex(likes);
      likes.splice(i, 1);
      return;
    }

    if (like === 'removed' && dislike === 'added') {
      const i = findUserIdIndex(likes);
      likes.splice(i, 1);
      user && dislikes.push(user.id);
      return;
    }

    if (like === null && dislike === 'added') {
      user && dislikes.push(user.id);
      return;
    }

    if (like === null && dislike === 'removed') {
      const i = findUserIdIndex(dislikes);
      dislikes.splice(i, 1);
      return;
    }

    if (like === 'added' && dislike === 'removed') {
      const i = findUserIdIndex(dislikes);
      dislikes.splice(i, 1);
      user && likes.push(user.id);
      return;
    }
  }

  const { mutate } = useMutation(moviesService.VoteMovie, {
    onSuccess: (data: AxiosResponse<IVotes>) => {
      isVotes(data) && handleVotes(data);
    },
    onError: (error: AxiosError<IError>) => {
      console.log(error);
    },
  });

  async function voteMovie(data: IVoteMoviePayload) {
    mutate(data);
  }

  return (
    <Typography
      sx={{
        marginBottom: '1rem',
      }}
      variant="button"
      display="block"
      gutterBottom
    >
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
            variant={checkIfVoted(likes) ? 'contained' : 'outlined'}
            color={checkIfVoted(likes) && 'success'}
            size="large"
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
            variant={checkIfVoted(dislikes) ? 'contained' : 'outlined'}
            color={checkIfVoted(dislikes) && 'error'}
            size="large"
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
    </Typography>
  );
};
