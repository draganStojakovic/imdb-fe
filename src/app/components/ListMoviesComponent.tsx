import { Typography, Box, ListItem, Stack, List } from '@mui/material';
import { IMovieStrippedDown } from 'app/types/IMovies';
import { Link } from 'react-router-dom';

type Props = {
  movies: IMovieStrippedDown[];
  caption: string;
};

export const ListMoviesComponent = ({ movies, caption }: Props) => {
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
                  }}
                  src={movie.coverImage}
                />
              </Link>
            </ListItem>
          ))}
        </List>
      </Stack>
    </Box>
  );
};
