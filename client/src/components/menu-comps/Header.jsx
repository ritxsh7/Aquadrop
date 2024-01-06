import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

//components
import Navbar from "./Navbar";
import logo from "../../images/logo.png";

export default function Header() {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 40 ? setSticky(true) : setSticky(false);
    });
  }, []);

  return (
    <div className={`top ${sticky ? "sticky-nav" : ""}`}>
      <Link to="/" style={{ textDecoration: "none", color: "whitesmoke" }}>
        <div className="logo">
          <img src={logo}></img>
          <h3>AquaDrop</h3>
        </div>
      </Link>
      <Navbar />
    </div>
  );
}
