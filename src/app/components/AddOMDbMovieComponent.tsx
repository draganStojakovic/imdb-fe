import { Button, Box } from '@mui/material';
import { IMovie, IMovieOMdb } from 'app/types/IMovies';
import { useMutation } from 'react-query';
import { moviesService } from 'app/services/movies.service';
import { IMovieDraft } from 'app/types/IMovies';
import { notficationManager } from 'app/utils/NotificationManager';
import { AxiosError, AxiosResponse } from 'axios';
import { IError } from 'app/types/IError';
import { isObjOfType } from 'app/utils/typeCheckers';
import { useContext } from 'react';
import { LoadingContext } from 'app/context/LoadingContext';

type Props = {
  omdbMovie: IMovieOMdb;
};

export const AddOMDbMovieComponent = ({ omdbMovie }: Props) => {
  const { loading, setLoading } = useContext(LoadingContext);

  const { mutate } = useMutation(moviesService.CreateMovie, {
    onSuccess: (data: AxiosResponse<IMovie>) => {
      setLoading(false);
      if (isObjOfType<IMovie>(data))
        notficationManager.success('Succesfully added a new movie!');
    },
    onError: (error: AxiosError<IError>) => {
      setLoading(false);
      error.response?.data?.errors.forEach((error) =>
        notficationManager.error(error.msg)
      );
    },
  });

  async function postMovie(movie: IMovieDraft) {
    setLoading(true);
    mutate(movie);
  }

  return (
    <Box mt={3} position="absolute" bottom="0px">
      <Button
        color="inherit"
        disabled={loading}
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
