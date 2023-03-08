import useAuthGuard from 'app/hooks/useAuthGuard';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { IMovie, IMovieCreate } from 'app/types/IMovies';
import { useContext } from 'react';
import { LoadingContext } from 'app/context/LoadingContext';
import { moviesService } from 'app/services/movies.service';
import { isMovie, isGenres } from 'app/utils/typeCheckers';
import { notficationManager } from 'app/utils/NotificationManager';
import { AxiosResponse, AxiosError } from 'axios';
import { IError } from 'app/types/IError';

import {
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  Checkbox,
  FormControl,
  FormLabel,
  FormControlLabel,
  List,
  ListItem,
  Button,
} from '@mui/material';

import { genresService } from 'app/services/genres.service';

export const CreateMoviePage = () => {
  useAuthGuard(true);

  const { setLoading } = useContext(LoadingContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IMovieCreate>({
    defaultValues: {
      title: '',
      description: '',
      coverImage: '',
      genres: [],
    },
  });

  const { mutate } = useMutation(moviesService.CreateMovie, {
    onSuccess: (data: AxiosResponse<IMovie>) => {
      if (isMovie(data)) {
        setLoading(false);
        notficationManager.success('Succefully added a movie');
      }
    },
    onError: (error: AxiosError<IError>) => {
      error?.response?.data?.errors?.forEach((error) => {
        if (
          error.param === 'title' ||
          error.param === 'description' ||
          error.param === 'coverImage' ||
          error.param === 'genres'
        ) {
          setError(error.param, { message: error.msg });
        }
      });
      setLoading(false);
    },
  });

  const { data } = useQuery('genres', genresService.GetGenres);
  console.log(data);
  const onSubmit: SubmitHandler<IMovieCreate> = async (movie) => {
    // setLoading(true);
    // mutate(movie);
    console.log(movie);
  };

  return (
    <Container component="main" maxWidth="xl">
      <Box
        sx={{
          marginTop: 10,
          marginBottom: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Add a Movie
        </Typography>
        <Box sx={{ marginTop: 5 }}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  {...register('title', {
                    required: 'Title is required',
                  })}
                  helperText={errors.title ? errors.title.message : ''}
                  error={errors.title ? true : false}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={10}
                  {...register('description', {
                    required: 'Description is required',
                  })}
                  helperText={
                    errors.description ? errors.description.message : ''
                  }
                  error={errors.description ? true : false}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Cover Image"
                  {...register('coverImage', {
                    required: 'Cover Image is required',
                  })}
                  helperText={
                    errors.coverImage ? errors.coverImage.message : ''
                  }
                  error={errors.coverImage ? true : false}
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
