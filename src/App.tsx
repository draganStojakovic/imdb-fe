import Pages from './app/layout/index';
import Router from './app/router/Router';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { lime, yellow } from '@mui/material/colors';
import UserProvider from './app/providers/UserProvider';
import LoadingProvider from 'app/providers/LoadingProvider';
import MovieParamsProvider from 'app/providers/MovieParamsProvider';
import EventProvider from 'app/providers/EventProvider';

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
          <EventProvider>
            <MovieParamsProvider>
              <Pages>
                <Router />
              </Pages>
            </MovieParamsProvider>
          </EventProvider>
        </UserProvider>
      </LoadingProvider>
    </ThemeProvider>
  );
}

export default App;
