// src/structure/RenderNavigation.jsx
import { Route, Routes } from "react-router-dom";
import { AuthData } from "../utils/AuthWrapper.jsx";
import { nav } from "./navigation.jsx";
import { Link } from "react-router-dom";
export const RenderRoutes = () => {
  const { user } = AuthData(); // Ensure AuthData returns the correct context

  if (!user) {
    return null; // or a loading spinner if context isn't ready yet
  }

  return (
    <Routes>
      {nav.map((r, i) => {
        if (r.isPrivate && user.isAuthenticated) {
          return <Route key={i} path={r.path} element={r.element} />;
        } else if (!r.isPrivate) {
          return <Route key={i} path={r.path} element={r.element} />;
        } else {
          return null;
        }
      })}
    </Routes>
  );
};

export const RenderMenu = () => {
  const { user, logout } = AuthData();

  if (!user) {
    return null; // or a loading spinner if context isn't ready yet
  }

  const MenuItem = ({ r }) => (
    <div className="menuItem">
      <Link to={r.path}>{r.name}</Link>
    </div>
  );

  return (
    <div className="menu">
      {nav.map((r, i) => {
        if (!r.isPrivate && r.isMenu) {
          return <MenuItem key={i} r={r} />;
        } else if (user.isAuthenticated && r.isMenu) {
          return <MenuItem key={i} r={r} />;
        } else {
          return null;
        }
      })}
      {/* Optionally render logout/login */}
      {/* {user.isAuthenticated ? (
        <div className="menuItem">
          <Link to="/" onClick={logout}>
            Log out
          </Link>
        </div>
      ) : (
        <div className="menuItem">
          <Link to="/signin">Log in</Link>
        </div>
      )} */}
    </div>
  );
};
