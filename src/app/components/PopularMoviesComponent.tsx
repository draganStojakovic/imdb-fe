import {
  Typography,
  Card,
  CardContent,
  Box,
  ListItem,
  List,
  CardMedia,
} from '@mui/material';
import { IPopularMovie } from 'app/types/IMovies';
import { Link } from 'react-router-dom';

type Props = {
  popularMovies: IPopularMovie[];
};

export const PopularMoviesComponent = ({ popularMovies }: Props) => {
  return (
    <Card>
      <Box sx={{ m: 2 }}>
        <Typography variant="h5">Popular movies:</Typography>
        <CardContent>
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
        </CardContent>
      </Box>
    </Card>
  );
};
