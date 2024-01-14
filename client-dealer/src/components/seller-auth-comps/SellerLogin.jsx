import React, { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

//data
import seller from "../../assets/seller.png";
import salesman from "../../assets/salesman.png";

//styles
import "./SellerLogin.css";

//comps
import SellerSteps from "./SellerSteps";
import SellerSignIn from "./SellerSignIn";
import Login from "./Login";

const SellerLogin = () => {
  // =================AUTH VIEW================
  const [authState, setAuthState] = useState({
    view: "login",
  });

  return (
    <Box
      component="section"
      sx={{
        padding: { md: "1rem auto" },
      }}
    >
      <SellerSteps activeStep={0} />
      <Stack
        className="signup-form"
        sx={{
          margin: { xs: "0", md: "1rem auto" },
          height: { md: "fit-content" },
        }}
        direction={{ md: "row" }}
      >
        <Stack
          sx={{
            bgcolor: "primary.main",
            color: "primary.contrastText",
            padding: { xs: "0.8rem", md: "3rem 1rem" },
            alignItems: "center",
            borderRadius: "0.4rem",
            gap: { xs: "3rem" },
          }}
          direction={{ xs: "row", md: "column" }}
        >
          <Stack className="seller-intro" direction="row">
            <Box>
              <h2 style={{ color: "#FFE177" }}>
                {authState.view === "login" ? "Login now" : "Join as Seller"}
              </h2>
              <p>
                {authState.view === "login"
                  ? "Log In to get better experience and have a look at your stats"
                  : "Join with us as a seller and experience the best time togethergrowing."}
              </p>
            </Box>
            <img src={seller} className="shopimg"></img>
          </Stack>
          <Stack
            alignItems="center"
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <img src={salesman} className="seller-icon"></img>
            <Typography
              component="h2"
              align="center"
              color="#FFE177"
              sx={{
                mt: "1rem",
              }}
            >
              {authState.view === "login"
                ? "Welcome back !"
                : "New to Aquadrop?"}
            </Typography>
            <Typography component="p" align="justify" fontSize="small">
              {authState.view === "login"
                ? "Take a look at your shops and products. Grow by adding more shops and products"
                : "Register with Aquadrop, list out your shops and products and makecustomers approach you."}
            </Typography>
          </Stack>
        </Stack>
        {authState.view === "login" ? (
          <Login setAuthState={setAuthState} />
        ) : (
          <SellerSignIn setAuthState={setAuthState} />
        )}
      </Stack>
    </Box>
  );
};

export default SellerLogin;
