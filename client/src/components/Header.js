import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

//components
import Navbar from "./Navbar";

export default function Header() {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 0 ? setSticky(true) : setSticky(false);
    });
  }, []);

  return (
    <div className={`top ${sticky ? "sticky-nav" : ""}`}>
      <Link to="/" style={{ textDecoration: "none", color: "whitesmoke" }}>
        <div className="logo">
          <h3>
            Aqua<span>Drop</span>
          </h3>
        </div>
      </Link>
      <Navbar />
    </div>
  );
}
