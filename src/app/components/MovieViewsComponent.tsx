import { Button, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useMutation } from 'react-query';
import { moviesService } from 'app/services/movies.service';
import { useEffect } from 'react';

type Props = {
  movieId: string | undefined;
  views: string | undefined;
};

export const MovieViewsComponent = ({ movieId, views }: Props) => {
  const location = useLocation();

  const { mutate } = useMutation(moviesService.IncrementMovieViews);

  async function incrementView(data: string) {
    mutate(data);
  }

  function checkIfonMovieDetailsPage() {
    if (location.pathname === `/movies/${movieId}`) return true;
    return false;
  }

  useEffect(() => {
    checkIfonMovieDetailsPage() && incrementView(movieId as string);
  }, [movieId]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'right',
        flexWrap: 'wrap',
      }}
    >
      <Button
        type="button"
        variant="contained"
        size="medium"
        disableRipple
        sx={{ borderRadius: 20 }}
      >
        {views} | views
      </Button>
    </Box>
  );
};
