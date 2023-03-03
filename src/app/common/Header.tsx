import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { ROUTES } from "app/utils/static";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { authService } from "app/services/auth.service";
import { notficationManager } from "app/utils/NotificationManager";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export const Header = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const { mutate } = useMutation(authService.LogOut, {
    onSuccess: () => {
      logout();
    },
    onError: () => {
      notficationManager.error("Can't log out"); // privremeno
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
                <Button
                  color="inherit"
                  onClick={() => {
                    navigate(ROUTES.HOME);
                  }}
                >
                  Home
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
              <Button
                color="inherit"
                onClick={() => {
                  navigate(ROUTES.LOGIN);
                }}
              >
                Log In
              </Button>
              <Button
                color="inherit"
                onClick={() => {
                  navigate(ROUTES.REGISTER);
                }}
              >
                Register
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      )}
    </>
  );
};
