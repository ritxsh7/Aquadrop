import React, { useState } from "react";
import { Button } from "react-bootstrap";
import sideBanner from "../images/side-banner.png";

import "../styles/addProducts.css";

export default function AddProducts() {
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [location, setLocation] = useState("");
  const [success, setSuccess] = useState(false);

  return (
    <>
      {
        <div className="seller-wrapper">
          <h2>JOIN AQUADROP</h2>
          <h1>Clean Water, For All</h1>

          <div className="input-form">
            {success ? (
              <div className="input-form">
                <h3> YOU ARE A SELLER NOW</h3>
                <Button
                  variant="success"
                  className="mt-3"
                  onClick={() => setSuccess(false)}
                >
                  Done
                </Button>
              </div>
            ) : (
              <>
                <label>
                  SHOP NAME
                  <input
                    type="text"
                    placeholder="Enter name of your shop"
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
                <label>
                  SHOP IMAGE URL
                  <input
                    type="text"
                    placeholder="Enter name of your shop"
                    onChange={(e) => setImgUrl(e.target.value)}
                  />
                </label>
                <label>
                  LOCATION
                  <input
                    type="text"
                    placeholder="Enter Shop Location"
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </label>

                <Button
                  variant="dark"
                  style={{ width: "60%", margin: "20px auto" }}
                >
                  Join us
                </Button>

                {/* <Button variant='danger' onClick={() => dispatch({
                      type: 'REMOVE_FROM_SHOPLIST'
                  })}>
                    Remove
                  </Button> */}
              </>
            )}
          </div>
        </div>
      }
    </>
  );
}
