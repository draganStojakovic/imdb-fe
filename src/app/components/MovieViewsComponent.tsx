import { Button } from '@mui/material';
import { useMutation } from 'react-query';
import { moviesService } from 'app/services/movies.service';
import { useEffect } from 'react';
import useCheckLocation from 'app/hooks/useCheckLocation';

type Props = {
  movieId: string | undefined;
  views: string | undefined;
};

export const MovieViewsComponent = ({ movieId, views }: Props) => {
  const singleMoviePage = useCheckLocation(`/movies/${movieId}`);
  const { mutate } = useMutation(moviesService.IncrementMovieViews);

  async function incrementView(data: string) {
    mutate(data);
  }

  useEffect(() => {
    singleMoviePage && incrementView(movieId as string);
  }, [movieId]);

  return (
    <Button
      type="button"
      variant="outlined"
      size="small"
      disableRipple
      sx={{ borderRadius: 20, color: '#6C6C6C' }}
    >
      {views} | views
    </Button>
  );
};
