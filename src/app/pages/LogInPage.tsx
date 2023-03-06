import { useForm, SubmitHandler } from 'react-hook-form';
import { IError, ISignIn, IUser } from 'app/types/IUser';
import { useMutation } from 'react-query';
import { useContext } from 'react';
import { UserContext } from 'app/context/UserContext';
import { LoadingContext } from 'app/context/LoadingContext';
import { authService } from 'app/services/auth.service';
import { isAnUser } from 'app/utils/typeCheckers';
import { ROUTES } from 'app/utils/static';
import { notficationManager } from 'app/utils/NotificationManager';
import { Link } from 'react-router-dom';

import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Container } from '@mui/material';

import useAuthGuard from 'app/hooks/useAuthGuard';
import { AxiosError, AxiosResponse } from 'axios';

export const LogInPage = () => {
  useAuthGuard(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ISignIn>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { setLoading, loading } = useContext(LoadingContext);

  const { login } = useContext(UserContext); // kontekst poziva hook

  const { mutate } = useMutation(authService.LogIn, {
    onSuccess: (data: AxiosResponse<IUser>) => {
      if (isAnUser(data)) {
        login(data);
        notficationManager.success('Welcome');
      }
      setLoading(false);
    },
    onError: (error: AxiosError<IError>) => {
      error?.response?.data?.errors?.forEach((error) => {
        setError('email', { message: error.msg });
        setError('password', { message: error.msg });
      });
      setLoading(false);
    },
  });

  const onSubmit: SubmitHandler<ISignIn> = async (user) => {
    setLoading(true);
    mutate(user);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Log In
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                helperText={errors.email ? errors.email.message : ''}
                error={errors.email ? true : false}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                {...register('password', {
                  required: 'Password is required',
                })}
                helperText={errors.password ? errors.password.message : ''}
                error={errors.password ? true : false}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            disabled={loading}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link
              to={ROUTES.REGISTER}
              style={{ textDecoration: 'none', color: 'blue' }}
            >
              {"Don't have an account? Register"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
