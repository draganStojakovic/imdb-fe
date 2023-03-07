import Pages from "./app/layout/index";
import Router from "./app/router/Router";
import { createContext } from "react";
import { isAuthContextType } from "./app/types/isAuthContextType";

export const isAuthContext = createContext<isAuthContextType | null>(null);

function App() {
  const isAuth = !!window.localStorage.getItem("userId");
  return (
    <isAuthContext.Provider value={{ isAuth }}>
      <Pages>
        <Router />
      </Pages>
    </isAuthContext.Provider>
  );
}

export default App;
