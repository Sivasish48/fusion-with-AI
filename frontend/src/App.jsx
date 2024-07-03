import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import Auth from "./Pages/Auth";
import Header from "./components/header";
import SIgnin from "./Pages/SIgnin";
import SIgnup from "./Pages/SIgnup";
import Home from "./Pages/Home";
const App = () => {
  return (
    <Router>
      <Header /> {/* Render Header globally */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/signin" element={<SIgnin />} />
        <Route path="/signup" element={<SIgnup />} />
        <Route path="/home" element={<Home />} />
        {/* Add a catch-all route for unmatched paths */}
        {/* <Route path="*" element={<NotFound />} /> Replace with your Not Found component */}
      </Routes>
    </Router>
  );
};

export default App;
