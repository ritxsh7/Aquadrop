import React from "react";

//components
import Hero from "../components/Hero";
import HowtoOrder from "../components/HowtoOrder";
import Home from "../components/Home";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <Hero />
      <HowtoOrder />
      <Home />
    </div>
  );
}
