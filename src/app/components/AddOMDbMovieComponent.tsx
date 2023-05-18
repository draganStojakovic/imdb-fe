import { Button, Box } from '@mui/material';
import { IMovieOMdb } from 'app/types/IMovies';
import { IMovieDraft } from 'app/types/IMovies';
import { notficationManager } from 'app/utils/NotificationManager';
import { useContext, useEffect } from 'react';
import { LoadingContext } from 'app/context/LoadingContext';
import useCreateNewMovie from 'app/hooks/useCreateNewMovie';
import { isPrimitiveType } from 'app/utils/typeCheckers';

type Props = {
  omdbMovie: IMovieOMdb;
};

export const AddOMDbMovieComponent = ({ omdbMovie }: Props) => {
  const { loading, setLoading } = useContext(LoadingContext);
  const { mutate, success, error, clearSuccess } = useCreateNewMovie();

  async function postMovie(movie: IMovieDraft) {
    setLoading(true);
    mutate(movie);
  }

  useEffect(() => {
    setLoading(false);
    if (success === true && isPrimitiveType(error, null)) {
      notficationManager.success('Succesfully added a new movie!');
    } else if (success === false) {
      if (error) {
        error?.forEach((err) => {
          notficationManager.error(err.msg);
        });
      }
    }
    clearSuccess();
  }, [success]);

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
