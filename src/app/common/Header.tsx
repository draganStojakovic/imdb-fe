import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { ROUTES } from "../utils/static";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const Header = () => {
  const { user, logout } = useContext(UserContext);

  return (
    <header>
      {!user ? (
        <nav className="navbar navbar-light bg-light shadow-sm">
          <div className="d-flex justify-content-start">
            <div style={{ color: "#f8f9fa" }}>_</div>
            <h3>IMDB</h3>
            <div style={{ color: "#f8f9fa" }}>_</div>
            <Button variant="text">
              <Link to={ROUTES.HOME} style={{ textDecoration: "none" }}>
                Home
              </Link>
            </Button>
          </div>
          <div className="d-flex justify-content-end">
            <Button variant="text">
              <Link to={ROUTES.LOGIN} style={{ textDecoration: "none" }}>
                Login
              </Link>
            </Button>
            <div style={{ color: "#f8f9fa" }}>_</div>
            <Button variant="text">
              <Link to={ROUTES.REGISTER} style={{ textDecoration: "none" }}>
                Register
              </Link>
            </Button>
            <div style={{ color: "#f8f9fa" }}>_</div>
          </div>
        </nav>
      ) : (
        <nav className="navbar navbar-light bg-light shadow-sm">
          <div className="d-flex justify-content-start">
            <div style={{ color: "#f8f9fa" }}>_</div>
            <h3>IMDB</h3>
            <div style={{ color: "#f8f9fa" }}>_</div>
          </div>
          <div className="d-flex justify-content-end">
            <Button
              variant="text"
              onClick={() => {
                logout();
              }}
            >
              LogOut
            </Button>
            <div style={{ color: "#f8f9fa" }}>_</div>
          </div>
        </nav>
      )}
    </header>
  );
};
