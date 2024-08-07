import React from "react";
import Hero from "./Hero";
import Steps from "./LandingStepper";
import "./HomePage.css";

const HomePage: React.FC = () => {
  return (
    <div className="homepage-container">
      <Hero />
      <Steps />
    </div>
  );
};

export default HomePage;
