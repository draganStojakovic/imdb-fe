import Pages from "./app/layout/index";
import UserProvider from "./app/providers/UserProvider";
import Router from "./app/router/Router";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import { lime, yellow } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: lime,
    secondary: yellow,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <main>
          <Pages>
            <Router />
          </Pages>
        </main>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
