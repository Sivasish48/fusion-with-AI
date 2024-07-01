import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import Dashboard from "../src/components/dashboard";
import Auth from "./Pages/Auth";  

const App = () => (
  <Router>
    <KindeProvider
      clientId="90a6a184e4fe45b9912c0f31dd838b53"
      domain="https://suvam.kinde.com"
      redirectUri="http://localhost:5174/dashboard"
      logoutUri="http://localhost:5174/"
    >
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auth" element={<Auth/>} />
      </Routes>
    </KindeProvider>
  </Router>
);

export default App;
