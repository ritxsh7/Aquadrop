import React from "react";

//components
import Hero from "../components/Hero";
import HowtoOrder from "../components/HowtoOrder";
import Header from "../components/Header";
import Home from "../components/Home";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <Header />
      <Hero />
      <HowtoOrder />
      <Home />
      <Footer />
    </div>
  );
}
