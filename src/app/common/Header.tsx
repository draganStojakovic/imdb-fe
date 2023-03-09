import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { ROUTES } from 'app/utils/static';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-query';
import { authService } from 'app/services/auth.service';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export const Header = () => {
  const { user, logout } = useContext(UserContext);

  const { mutate } = useMutation(authService.LogOut, {
    onSuccess: () => {
      logout();
    },
    onError: () => {
      logout();
    },
  });

  return (
    <>
      {user ? (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                IMDB
                <Button color="inherit">
                  <Link
                    to={ROUTES.MOVIES}
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    Home
                  </Link>
                </Button>
                <Button color="inherit">
                  <Link
                    to={ROUTES.MOVIES_CREATE}
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    Create Movie
                  </Link>
                </Button>
              </Typography>
              <Button
                color="inherit"
                onClick={() => {
                  mutate();
                }}
              >
                Log Out
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                IMDB
              </Typography>
              <Button color="inherit">
                <Link
                  to={ROUTES.LOGIN}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  Log In
                </Link>
              </Button>
              <Button color="inherit">
                <Link
                  to={ROUTES.REGISTER}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  Register
                </Link>
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      )}
    </>
  );
};
