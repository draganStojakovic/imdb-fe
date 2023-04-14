import {
  Typography,
  Card,
  CardContent,
  Box,
  ListItem,
  List,
  CardMedia,
} from '@mui/material';
import { IMovieStrippedDown } from 'app/types/IMovies';
import { Link } from 'react-router-dom';

type Props = {
  popularMovies: IMovieStrippedDown[];
  caption: string;
};

export const ListMoviesComponent = ({ popularMovies, caption }: Props) => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ m: 2 }}>
          <Typography variant="h5">{caption}</Typography>
          <List
            style={{
              display: 'flex',
              flexDirection: 'row',
              padding: '1rem',
              maxHeight: '70%',
              overflow: 'auto',
            }}
          >
            {popularMovies.map((movie) => (
              <ListItem key={movie.id}>
                <Link
                  to={`/movies/${movie.id}`}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <CardMedia component="img" image={movie.coverImage} />
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </CardContent>
    </Card>
  );
};
