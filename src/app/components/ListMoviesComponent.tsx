import { Typography, Box, ListItem, Stack, List } from '@mui/material';
import { IMovieStrippedDown } from 'app/types/IMovies';
import { Link } from 'react-router-dom';

type Props = {
  movies: IMovieStrippedDown[];
  caption: string;
  checkIfMouseIsOverCard: (
    mousedOverMovieId: string,
    currentMovieId: string
  ) => boolean;
  mouseOver: string;
  setMouseOver: React.Dispatch<React.SetStateAction<string>>;
};

export const ListMoviesComponent = ({
  movies,
  caption,
  checkIfMouseIsOverCard,
  mouseOver,
  setMouseOver,
}: Props) => {
  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="h5">{caption}</Typography>
      <Stack direction="row" spacing={2} sx={{ marginTop: '1rem' }}>
        <List
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: 0,
            maxHeight: '70%',
            overflow: 'auto',
          }}
        >
          {movies.map((movie) => (
            <ListItem key={movie.id}>
              <Link
                to={`/movies/${movie.id}`}
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <Box
                  component="img"
                  sx={{
                    height: 200,
                    boxShadow: checkIfMouseIsOverCard(mouseOver, movie.id)
                      ? 12
                      : 3,
                  }}
                  src={movie.coverImage}
                  onMouseOver={() => setMouseOver(() => movie.id)}
                  onMouseLeave={() => setMouseOver(() => '')}
                />
              </Link>
            </ListItem>
          ))}
        </List>
      </Stack>
    </Box>
  );
};
