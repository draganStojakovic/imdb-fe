import { Button, Box } from '@mui/material';
import { IMovie, IMovieOMdb } from 'app/types/IMovies';
import { useMutation } from 'react-query';
import { moviesService } from 'app/services/movies.service';
import { IMovieDraft } from 'app/types/IMovies';
import { notficationManager } from 'app/utils/NotificationManager';
import { AxiosError, AxiosResponse } from 'axios';
import { IError } from 'app/types/IError';
import { isObjOfType } from 'app/utils/typeCheckers';

type Props = {
  omdbMovie: IMovieOMdb;
};

export const AddOMDbMovieComponent = ({ omdbMovie }: Props) => {
  const { mutate } = useMutation(moviesService.CreateMovie, {
    onSuccess: (data: AxiosResponse<IMovie>) => {
      if (isObjOfType<IMovie>(data))
        notficationManager.success('Succesfully added a new movie!');
    },
    onError: (error: AxiosError<IError>) => {
      error.response?.data?.errors.forEach((error) =>
        notficationManager.error(error.msg)
      );
    },
  });

  async function postMovie(movie: IMovieDraft) {
    mutate(movie);
  }

  return (
    <Box mt={3} position="absolute" bottom="0px">
      <Button
        color="inherit"
        onClick={() =>
          postMovie({
            title: omdbMovie.title,
            description: omdbMovie.description,
            coverImage: omdbMovie.coverImage,
            genres: omdbMovie.genres.map((genre) => genre.id),
          })
        }
      >
        Add movie?
      </Button>
    </Box>
  );
};
