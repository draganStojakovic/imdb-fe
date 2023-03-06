import { useForm, SubmitHandler } from 'react-hook-form';
import { IRegister, IError } from 'app/types/IUser';
import { useMutation } from 'react-query';
import { authService } from 'app/services/auth.service';
import { notficationManager } from 'app/utils/NotificationManager';
import { useContext, useEffect } from 'react';
import { UserContext } from 'app/context/UserContext';
import { isAnUser } from 'app/utils/typeCheckers';
import { LoadingContext } from 'app/context/LoadingContext';
import { AxiosError } from 'axios';
import useErrors from 'app/hooks/useErrors';

import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Container } from '@mui/material';
import { Alert } from '@mui/material';
import { AlertTitle } from '@mui/material';

import useAuthGuard from 'app/hooks/useAuthGuard';

export const RegisterPage = () => {
  useAuthGuard(false);
  const { error, setError } = useErrors();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IRegister>({
    defaultValues: {
      fname: '',
      lname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    return () => setError(null);
  }, []);

  const { login } = useContext(UserContext);

  const { setLoading } = useContext(LoadingContext);

  const { mutate } = useMutation(authService.Register, {
    onSuccess: (data) => {
      if (isAnUser(data)) {
        login(data);
        notficationManager.success('Welcome');
      }
      setLoading(false);
    },
    onError: (error: AxiosError<IError>) => {
      if (error.response?.data?.errors[0]?.msg === 'Email already in use') {
        setError({
          body: 'email',
          msg: 'Email already in use',
        });
      }
      if (error.response?.data?.errors[0]?.msg === 'Password is too weak') {
        setError({
          body: 'password',
          msg: 'Password is too weak',
        });
      }
      setLoading(false);
    },
  });

  const onSubmit: SubmitHandler<IRegister> = async (user) => {
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
          Register
        </Typography>
        <br />
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="First Name"
                {...register('fname', {
                  required: 'First name is required',
                })}
                helperText={errors.fname ? errors.fname.message : ''}
                error={errors.fname ? true : false}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Last Name"
                {...register('lname', {
                  required: 'Last name is required',
                })}
                helperText={errors.lname ? errors.lname.message : ''}
                error={errors.lname ? true : false}
              />
            </Grid>
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
            {error && error.body === 'email' && (
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
                  validate: (value) =>
                    value === getValues('confirmPassword') ||
                    'Passwords do not match.',
                })}
                helperText={errors.password ? errors.password.message : ''}
                error={errors.password ? true : false}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                {...register('confirmPassword', {
                  required: 'Password is required',
                  validate: (value) =>
                    value === getValues('password') ||
                    'Passwords do not match.',
                })}
                helperText={
                  errors.confirmPassword ? errors.confirmPassword.message : ''
                }
                error={errors.confirmPassword ? true : false}
              />
            </Grid>
            {error && error.body === 'password' && (
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
      </Box>
    </Container>
  );
};
