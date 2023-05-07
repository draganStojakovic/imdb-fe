import useAuthGuard from 'app/hooks/useAuthGuard';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';
import { IMovie, IMovieDraft } from 'app/types/IMovies';
import { useContext, useState, useEffect } from 'react';
import { LoadingContext } from 'app/context/LoadingContext';
import { moviesService } from 'app/services/movies.service';
import { notficationManager } from 'app/utils/NotificationManager';
import { AxiosResponse, AxiosError } from 'axios';
import { IError } from 'app/types/IError';
import useGenres from 'app/hooks/useGenres';
import { IGenre } from 'app/types/IGenre';
import { isObjOfType, isPoster } from 'app/utils/typeCheckers';
import { UploadComponent } from 'app/components/UploadComponent';
import useErrors from 'app/hooks/useErrors';

import {
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Stack,
  Autocomplete,
} from '@mui/material';
import { IPoster } from 'app/types/IPoster';

export const CreateMoviePage = () => {
  useAuthGuard(true);
  const [poster, setPoster] = useState<IPoster | null>(null);
  const { error, setError: setErrors } = useErrors();

  const { getGenres } = useGenres();
  const { setLoading } = useContext(LoadingContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    reset,
  } = useForm<IMovieDraft>({
    defaultValues: {
      title: '',
      description: '',
      coverImage: '',
      genres: [],
    },
  });

  const { mutate } = useMutation(moviesService.CreateMovie, {
    onSuccess: (data: AxiosResponse<IMovie>) => {
      if (isObjOfType<IMovie>(data)) {
        setLoading(false);
        notficationManager.success('Succefully added a movie');
        reset();
        setPoster(null);
        setErrors(null);
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

  const onSubmit: SubmitHandler<IMovieDraft> = async (movie) => {
    setLoading(true);
    mutate(movie);
  };

  useEffect(() => {
    isPoster(poster) && setValue('coverImage', poster.id);
  }, [poster, setValue]);

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
                <Stack spacing={3} sx={{ width: 500 }}>
                  <Autocomplete
                    multiple
                    options={getGenres() ? (getGenres() as IGenre[]) : []}
                    getOptionLabel={(genres) => genres.name}
                    onChange={(e, values) =>
                      setValue(
                        'genres',
                        values.map((genre) => genre.id)
                      )
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        label="Multiple values"
                        placeholder="Genres"
                      />
                    )}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <UploadComponent
                  setPoster={setPoster}
                  setErrors={setErrors}
                  error={error}
                  poster={poster}
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
