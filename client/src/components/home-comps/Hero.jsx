import React, { useState } from "react";

//comps
import ForwardIcon from "../../images/forward.png";

//backend and routes
import axios from "axios";

function Hero() {
  const [pincode, setPincode] = useState("411018");

  const exploreShops = async (e) => {
    try {
      e.preventDefault();
      if (!pincode || isNaN(parseInt(pincode)) || pincode.length !== 6) {
        alert("Enter a valid Pin");
        return;
      }
    } catch (err) {
      console.log(err.msg);
    }
    document.getElementById("homepage").scrollIntoView();
  };

  return (
    <div className="hero">
      <h1 className="welcome">
        <b>
          <span>Water </span>
          Your Way, Anytime!
        </b>
      </h1>
      <p className="tag">
        {" "}
        Water Delivered, Life Elevated
        <br />
        Get to know the best drinking water dealers near you and have it
        delivered to your doorsteps!
      </p>
      <form className="buttons">
        <input
          type="pincode"
          required
          value={pincode}
          placeholder="Enter Pincode"
          onChange={(e) => setPincode(e.target.value)}
        ></input>
        <button className="explore" onClick={exploreShops}>
          Search by Pincode
          <div className="forward">
            <img src={ForwardIcon}></img>
          </div>
        </button>
      </form>
    </div>
  );
}

export default Hero;
