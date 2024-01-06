import React from "react";
import { Element } from "react-scroll";

const Footer = () => {
  return (
    <Element name="footer">
      <footer className="footer" id="footer">
        <p>Policies : Terms of use | Infrigement | Privacy</p>
        <p>© AquaDrop 2023</p>
        <p style={{ float: "right" }}>
          Need help? Visit the Help Center or <a>Contact Us</a>
        </p>
      </footer>
    </Element>
  );
};

export default Footer;
