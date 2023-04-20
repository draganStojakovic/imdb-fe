import { Button, Box } from '@mui/material';
import { IMovieOMdb } from 'app/types/IMovies';

type Props = {
  omdbMovie: IMovieOMdb;
};

export const AddOMDbMovieComponent = ({ omdbMovie }: Props) => {
  return (
    <Box mt={3} position="absolute" bottom="0px">
      <Button color="inherit">Add movie?</Button>
    </Box>
  );
};
