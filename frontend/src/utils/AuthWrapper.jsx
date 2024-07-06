import { createContext, useContext, useState } from "react";
import Header from "../components/header.jsx";
import { RenderMenu, RenderRoutes } from "../strucure/RenderNavigation.jsx";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {
  const [user, setUser] = useState({ name: "", isAuthenticated: false });
  const navigate = useNavigate();
  const login = (userName, password) => {
    return new Promise((resolve, reject) => {
      if (password === "password") {
        setUser({ name: userName, isAuthenticated: true });
        resolve("success");
      } else {
        reject("Incorrect password");
      }
    });
  };

  const logout = () => {
    setUser({ name: "", isAuthenticated: false });
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <>
        <Header />
        <RenderMenu />
        <RenderRoutes />
      </>
    </AuthContext.Provider>
  );
};
