import React, { useEffect } from "react";
import { Stack, Typography, Button, Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useState } from "react";

const LeftBanner = () => {
  const [top, setTop] = useState(true);

  useEffect(() => {
    const HandleScroll = () => {
      if (scrollY > 180) setTop(false);
      else setTop(true);
    };

    window.addEventListener("scroll", HandleScroll);
    return () => {
      window.removeEventListener("scroll", HandleScroll);
    };
  }, []);

  return (
    <Stack
      className="banner-left"
      mx="auto"
      p="4rem 0"
      alignItems="center"
      textAlign={{ xs: "center", md: "left" }}
    >
      <NavLink to="/">
        {top && (
          <Stack
            direction="row"
            gap="0.5rem"
            alignItems="center"
            sx={{
              backgroundColor: "transparent",
              color: "#407BFF",
              position: "fixed",
              top: "0.7rem",
              left: "0.7rem",
              cursor: "pointer",
            }}
          >
            <Box>
              <img src={logo} style={{ width: "1.4rem" }}></img>
            </Box>
            <Typography
              variant="h6"
              letterSpacing="normal"
              fontWeight="semibold"
            >
              AquaDrop |
            </Typography>
            <ion-icon name="home"></ion-icon>
          </Stack>
        )}
      </NavLink>
      <Typography variant="h3" fontWeight="600" letterSpacing="normal">
        CONNECT WITH THE
      </Typography>
      <Typography
        color="primary"
        variant="h2"
        fontWeight="600"
        letterSpacing="normal"
      >
        AQUA NETWORK
      </Typography>

      <Typography
        variant="p"
        color="#4b4b4b"
        letterSpacing="0.3rem"
        m={{ xs: "1rem 0", md: "1.5rem 0" }}
      >
        Already a dealer ?
      </Typography>
      <Stack gap="1rem" width="100%" alignItems="center">
        <NavLink to="/dealer/add-products" style={{ width: "95%" }}>
          <Button variant="contained" sx={{ width: "100%", p: { md: "1rem" } }}>
            Add Products
          </Button>
        </NavLink>
        <NavLink to="/" style={{ width: "95%" }}>
          <Button
            variant="outlined"
            sx={{ backgroundColor: "white", width: "100%", p: { md: "1rem" } }}
          >
            Dashboard
          </Button>
        </NavLink>
      </Stack>
    </Stack>
  );
};

export default LeftBanner;
