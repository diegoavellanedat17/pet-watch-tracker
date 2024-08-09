import React from "react";
import Hero from "./Hero";
import Steps from "./LandingStepper";
import AboutUs from "./AboutUs";
import "./HomePage.css";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <AboutUs />
      <Steps />
    </>
  );
};

export default HomePage;
