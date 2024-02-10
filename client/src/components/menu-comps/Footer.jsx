import React from "react";
import { Element } from "react-scroll";

const Footer = () => {
  return (
    <Element name="footer">
      <footer className="footer" id="footer">
        <p>Policies : Terms of use | Infrigement | Privacy</p>
        <p>© AquaDrop 2023</p>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          Need help? Contact Us
          <ion-icon name="call"></ion-icon>
          <span>+91 8421119810</span>
        </div>
      </footer>
    </Element>
  );
};

export default Footer;
