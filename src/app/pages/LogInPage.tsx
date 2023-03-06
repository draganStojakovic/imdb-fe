import { useForm, SubmitHandler } from 'react-hook-form';
import { IError, ISignIn, IUser } from 'app/types/IUser';
import { useMutation } from 'react-query';
import { useContext, useEffect } from 'react';
import { UserContext } from 'app/context/UserContext';
import { LoadingContext } from 'app/context/LoadingContext';
import { authService } from 'app/services/auth.service';
import { isAnUser } from 'app/utils/typeCheckers';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'app/utils/static';
import { notficationManager } from 'app/utils/NotificationManager';

import { Box } from '@mui/system';
import { AlertTitle, Link } from '@mui/material';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Container } from '@mui/material';
import { Alert } from '@mui/material';

import useAuthGuard from 'app/hooks/useAuthGuard';
import { AxiosError, AxiosResponse } from 'axios';
import useErrors from 'app/hooks/useErrors';

export const LogInPage = () => {
  useAuthGuard(false);
  const { error, setError } = useErrors();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignIn>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    return () => setError(null);
  }, []);

  const navigate = useNavigate();

  const { setLoading } = useContext(LoadingContext);

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
      if (error.response?.status === 401) {
        setError({
          body: 'credentials',
          msg: 'Invalid credentials',
        });
      }
      if (error.response?.status === 403) {
        setError({
          body: 'credentials',
          msg: 'Invalid request',
        });
      }
      setLoading(false);
    },
  });

  const onSubmit: SubmitHandler<ISignIn> = async (user) => {
    !error || setLoading(true);
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
            {error && (
              <Grid item xs={12}>
                <Alert severity="error">
                  <AlertTitle>{error.msg}</AlertTitle>
                </Alert>
              </Grid>
            )}
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
            {error && (
              <Grid item xs={12}>
                <Alert severity="error">
                  <AlertTitle>{error.msg}</AlertTitle>
                </Alert>
              </Grid>
            )}
          </Grid>
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Submit
          </Button>
        </Box>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link variant="body2" onClick={() => navigate(ROUTES.REGISTER)}>
              {"Don't have an account? Register"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
