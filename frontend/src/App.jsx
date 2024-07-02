import "./index.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./Pages/Landing";
import Dashboard from "./components/dashboard";
import Auth from "./Pages/Auth";
import Header from "./components/header";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";
const App = () => {
 
 return (
    <Router>
      <KindeProvider
        clientId="90a6a184e4fe45b9912c0f31dd838b53"
        domain="https://suvam.kinde.com"
        redirectUri="http://localhost:5173/dashboard" // The URI the user is redirected to after authentication
        logoutUri="http://localhost:5173/" // The URI the user is redirected to after logout
      >
        <Header />
        
          <Routes>
          <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>  
        
      </KindeProvider>
    </Router>
  );
}

export default App;
