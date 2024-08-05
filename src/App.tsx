import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import HomePage from "./components/HomePage"; // Asegúrate de importar el componente de la landing page
import PetTracker from "./components/PetTracker";
import History from "./components/History";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <NavigationBar />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pet-tracker" element={<PetTracker />} />{" "}
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
