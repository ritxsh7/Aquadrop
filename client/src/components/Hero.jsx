import React, { useState } from "react";

//comps
import ForwardIcon from "../images/forward.png";
import Steps from "../images/steps.png";

//backend and routes
import axios from "axios";

function Hero() {
  const [pincode, setPincode] = useState(0);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const exploreShops = async (e) => {
    try {
      e.preventDefault();
      console.log(pincode);
      const response = await axios.get(`${backendUrl}/nearbyshops`, {
        pincode,
      });
      console.log(response);
    } catch (err) {
      console.log(err.msg);
    }
    document.getElementById("homepage").scrollIntoView();
  };

  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className="welcome">
          <b>
            <span>Water </span>
            Your Way,
            <br />
            Anytime!
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
            placeholder="Enter Pincode"
            onChange={(e) => setPincode(e.target.value)}
          ></input>
          <button className="explore" onClick={exploreShops}>
            Discover more
            <div className="forward">
              <img src={ForwardIcon}></img>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Hero;
