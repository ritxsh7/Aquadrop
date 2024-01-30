import React from "react";
import { Stack, Typography, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

const RightBanner = () => {
  return (
    <Stack
      alignItems="center"
      textAlign="center"
      width="60vw"
      height="auto"
      my="auto"
    >
      <Typography variant="h2" color="whitesmoke">
        JOIN & GROW
      </Typography>
      <Typography
        variant="p"
        color="whitesmoke"
        letterSpacing="normal"
        my="1.5rem"
      >
        Connect with more consumers and Maximize your efficiency and revenue by
        becoming a part of our trusted and convenient water delivery network.
      </Typography>
      <Button
        variant="contained"
        component={NavLink}
        to="/dealer/register-shop/register/1"
        sx={{
          letterSpacing: "normal",
          mt: "1.5rem",
          width: "15rem",
          p: { md: "1rem" },
        }}
      >
        Register your shop
      </Button>
    </Stack>
  );
};

export default RightBanner;
