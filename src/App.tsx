import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import NavigationBar from "./components/Navbar";
import HomePage from "./components/HomePage";
import axios from "axios";
import PetTracker from "./components/PetTracker";
import History from "./components/History";
import { initGA, logPageView } from "./utils/analytics";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import NotFound from "./components/NotFound";
import "./App.css";

initGA();

logPageView();

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const validateAccessToken = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        try {
          const response = await axios.get(
            "https://api.petwatch.tech/get-current-user",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          if (response.data && response.data.data) {
            setIsAuthenticated(true);
            setUsername(response.data.data.username);
          } else {
            handleLogout();
          }
        } catch (error) {
          console.error("Token validation failed", error);
          handleLogout();
        }
      }
    };

    validateAccessToken();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("idToken");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <NavigationBar
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
            }
          />
          <Route path="/pet-tracker" element={<PetTracker />} />
          <Route path="/history" element={<History />} />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard username={username} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
