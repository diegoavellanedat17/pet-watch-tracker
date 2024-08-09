import React from "react";
import Hero from "./Hero";
import Steps from "./LandingStepper";
import AboutUs from "./AboutUs";
import JoinUs from "./JoinUs";
import "./HomePage.css";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <AboutUs />
      <Steps />
      <JoinUs />
    </>
  );
};

export default HomePage;
