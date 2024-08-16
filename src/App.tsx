import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import NavigationBar from "./components/Navbar";
import HomePage from "./components/HomePage";
import PetTracker from "./components/PetTracker";
import History from "./components/History";
import { initGA, logPageView } from "./utils/analytics";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "./App.css";

initGA();

logPageView();

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <NavigationBar />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pet-tracker" element={<PetTracker />} />
          <Route path="/history" element={<History />} />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
