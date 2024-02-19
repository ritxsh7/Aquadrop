import React from "react";
import { Stack, Typography, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

const RightBanner = () => {
  return (
    <Stack
      alignItems="center"
      textAlign="center"
      width="100%"
      height={{ xs: "60vh", md: "100vh" }}
      my="auto"
      p="1rem"
      bgcolor="#407BFF"
      paddingTop={{ xs: "10vh", md: "30vh" }}
    >
      <Typography color="white" variant="h2" fontWeight="bold">
        JOIN AND GROW
      </Typography>
      <Typography
        variant="p"
        color="white"
        letterSpacing="normal"
        my="1.5rem"
        width="80%"
      >
        Connect with more consumers and Maximize your efficiency and revenue by
        becoming a part of our trusted and convenient water delivery network.
      </Typography>
      <Button
        variant="outlined"
        component={NavLink}
        to="/dealer/register-shop/register/1"
        sx={{
          bgcolor: "white",
          color: "black",
          letterSpacing: "normal",
          mt: "1.5rem",
          width: "95%",
          maxWidth: "500px",
          p: { md: "1rem" },
          ":hover": {
            bgcolor: "white",
          },
        }}
      >
        Register your shop
      </Button>
    </Stack>
  );
};

export default RightBanner;
