import React from "react";
import Hero from "./Hero";
import AboutUs from "./AboutUs";
import "./HomePage.css";

const HomePage: React.FC = () => {
  return (
    <div className="homepage-container">
      <Hero />
      <AboutUs />
    </div>
  );
};

export default HomePage;
