import Pages from "./app/layout/index";
import UserProvider from "./app/providers/UserProvider";
import Router from "./app/router/Router";

function App() {
  return (
    <UserProvider>
      <Pages>
        <Router />
      </Pages>
    </UserProvider>
  );
}

export default App;
