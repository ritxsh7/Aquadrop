import React from "react";
import { Box, Stack, Typography } from "@mui/material";

//data
import seller from "../../images/seller.png";
import salesman from "../../images/salesman.png";
import loginbg from "../../images/login-bg.jpg";

//styles
import "./SellerLogin.css";

//comps
import SellerSteps from "./SellerSteps";
import SellerSignIn from "./SellerSignIn";

const SellerLogin = () => {
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
              <h2 style={{ color: "#FFE177" }}>Join as Seller</h2>
              <p>
                Join with us as a seller and experience the best time together
                growing.
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
              New to Aquadrop??
            </Typography>
            <Typography component="p" align="justify" fontSize="small">
              Register with Aquadrop, list out your shops and products and make
              customers approach you.
            </Typography>
          </Stack>
        </Stack>
        <SellerSignIn />
      </Stack>
    </Box>
  );
};

export default SellerLogin;
