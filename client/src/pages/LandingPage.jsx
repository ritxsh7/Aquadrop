import React from "react";

//components
import Hero from "../components/home-comps/Hero";
import HowtoOrder from "../components/home-comps/HowtoOrder";
import Home from "../components/home-comps/Home";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <Hero />
      <HowtoOrder />
      <Home />
    </div>
  );
}
