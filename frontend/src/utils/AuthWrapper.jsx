import { createContext, useContext, useState, useEffect } from "react";
import Header from "../components/header.jsx";
import { RenderMenu, RenderRoutes } from "@/strucure/RenderNavigation.jsx";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {
  const [user, setUser] = useState({ name: "", isAuthenticated: false });
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser && savedUser.isAuthenticated) {
      setUser(savedUser);
    }
  }, []);

  const login = (userName, password) => {
    return new Promise((resolve, reject) => {
      if (password === "FUSION") {
        const loggedInUser = { name: userName, isAuthenticated: true };
        setUser(loggedInUser);
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        resolve("success");
      } else {
        reject("Incorrect password");
      }
    });
  };

  const logout = () => {
    setUser({ name: "", isAuthenticated: false });
    localStorage.removeItem("user");
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
