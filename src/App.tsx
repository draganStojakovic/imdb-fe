import Pages from './app/layout/index';
import UserProvider from './app/providers/UserProvider';
import Router from './app/router/Router';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { lime, yellow } from '@mui/material/colors';
import LoadingProvider from 'app/providers/LoadingProvider';
import MoviesProvider from 'app/providers/MoviesProvider';

const theme = createTheme({
  palette: {
    primary: lime,
    secondary: yellow,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LoadingProvider>
        <UserProvider>
          <MoviesProvider>
            <Pages>
              <Router />
            </Pages>
          </MoviesProvider>
        </UserProvider>
      </LoadingProvider>
    </ThemeProvider>
  );
}

export default App;
