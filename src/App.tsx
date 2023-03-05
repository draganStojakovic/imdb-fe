import Pages from "./app/layout/index";
import UserProvider from "./app/providers/UserProvider";
import Router from "./app/router/Router";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import { lime, yellow } from "@mui/material/colors";
import LoadingProvider from "app/providers/LoadingProvider";

const theme = createTheme({
  palette: {
    primary: lime,
    secondary: yellow,
  },
});

function App() {
  return (
    /* eslint-disable */
    <ThemeProvider theme={theme}>
      <LoadingProvider>
        <UserProvider>
          <main>
            <Pages>
              <Router />
            </Pages>
          </main>
        </UserProvider>
      </LoadingProvider>
    </ThemeProvider>
  );
}

export default App;
