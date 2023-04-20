import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Stack,
  ListItem,
  CardActions,
  Box,
} from '@mui/material';
import { IMovieOMdb } from 'app/types/IMovies';
import { ListItemsChipComponent } from './ListItemsChipComponent';
import { AddOMDbMovieComponent } from 'app/components/AddOMDbMovieComponent';

type Props = {
  omdbMovie: IMovieOMdb;
};

export const OMDbMovieDetails = ({ omdbMovie }: Props) => {
  return (
    <Card
      sx={{
        marginTop: 5,
        marginBottom: 5,
        boxShadow: 3,
      }}
      style={{ backgroundColor: '#fbfbfb' }}
    >
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <CardMedia
            component="img"
            alt={`${omdbMovie.coverImage} - movie cover`}
            image={omdbMovie.coverImage}
          />
        </Grid>
        <Grid item xs={8}>
          <CardContent>
            <Stack spacing={0}>
              <ListItem>
                <Typography variant="h3" gutterBottom>
                  {omdbMovie.title}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="justify"
                >
                  {omdbMovie.description}
                </Typography>
              </ListItem>
              <Grid container spacing={2}>
                <Grid item xs={10}>
                  <Box mt={3} position="absolute" bottom="0px">
                    <ListItem>
                      <ListItemsChipComponent
                        list={omdbMovie.genres}
                        direction="row"
                      />
                    </ListItem>
                  </Box>
                </Grid>
                <Grid item xs={2}>
                  <CardActions>
                    <AddOMDbMovieComponent omdbMovie={omdbMovie} />
                  </CardActions>
                </Grid>
              </Grid>
            </Stack>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};
