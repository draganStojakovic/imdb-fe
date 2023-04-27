import { Button } from '@mui/material';
import { useMutation } from 'react-query';
import { moviesService } from 'app/services/movies.service';
import { useEffect } from 'react';

type Props = {
  movieId: string;
  views: string;
  currentPath: boolean;
};

export const MovieViewsComponent = ({ movieId, views, currentPath }: Props) => {
  const { mutate } = useMutation(moviesService.IncrementMovieViews);

  async function incrementView(data: string) {
    mutate(data);
  }

  useEffect(() => {
    currentPath && incrementView(movieId);
  }, [movieId, currentPath]);

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
