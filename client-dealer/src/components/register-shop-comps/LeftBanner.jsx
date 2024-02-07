import React from "react";
import { Stack, Typography, Button, Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";

const LeftBanner = () => {
  return (
    <Stack
      className="banner-left"
      p={{ xs: "2rem 1rem ", md: "4rem 1rem" }}
      textAlign={{ xs: "center", md: "left" }}
    >
      <Typography color="#4b4b4b" variant="h2" fontWeight="600">
        GET STARTED
      </Typography>
      <Typography color="#4b4b4b" variant="h5">
        with
      </Typography>
      <Stack
        direction="row"
        my={{ xs: "0.6rem", md: "1.5rem" }}
        gap="1rem"
        alignItems="center"
        justifyContent={{ xs: "center", md: "left" }}
      >
        <Box
          component="img"
          src={logo}
          sx={{ height: { xs: "2rem", md: "5rem" } }}
        ></Box>
        <Typography color="primary" variant="h1" fontWeight="bold">
          AquaDrop
        </Typography>
      </Stack>
      <Typography
        variant="p"
        color="#4b4b4b"
        letterSpacing="0.3rem"
        m={{ xs: "1rem 0", md: "2rem 0" }}
        mt={{ md: "7rem" }}
      >
        Already a dealer ?
      </Typography>
      <Stack direction={{ xs: "column", md: "row" }} gap="1rem">
        <NavLink to="/dealer/add-products">
          <Button
            variant="contained"
            sx={{ width: "15rem", p: { md: "1rem" } }}
          >
            Add Products
          </Button>
        </NavLink>
        <NavLink to="/">
          <Button variant="outlined" sx={{ width: "15rem", p: { md: "1rem" } }}>
            Dashboard
          </Button>
        </NavLink>
      </Stack>
    </Stack>
  );
};

export default LeftBanner;
