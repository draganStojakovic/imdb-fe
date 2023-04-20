import { Button, Box } from '@mui/material';
import { IMovieOMdb } from 'app/types/IMovies';
import { useMutation } from 'react-query';
import { moviesService } from 'app/services/movies.service';
import { IMovieDraft } from 'app/types/IMovies';
import { notficationManager } from 'app/utils/NotificationManager';

type Props = {
  omdbMovie: IMovieOMdb;
};

export const AddOMDbMovieComponent = ({ omdbMovie }: Props) => {
  const { mutate } = useMutation(moviesService.CreateMovie, {
    onSuccess: () => {
      notficationManager.success('Succesfully added a new movie!');
    },
    onError: () => {
      notficationManager.error('Movie already in database.');
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
