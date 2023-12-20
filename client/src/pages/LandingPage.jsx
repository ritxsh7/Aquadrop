import React from "react";

//components
import Hero from "../components/Hero";
import Steps from "../images/steps.png";
import Header from "../components/Header";
import Home from "../components/Home";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <>
      <div className="landing-page">
        <Header />
        <Hero />
        <div className="how-to-order">
          <h3>How to Order?</h3>
          <h4>Follow the steps</h4>
          <img src={Steps}></img>
        </div>
        <Home />
        <Footer />
      </div>
    </>
  );
}
