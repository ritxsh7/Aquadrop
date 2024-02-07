import React from "react";
import { Box, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import ShopForm from "../components/register-shop-comps/ShopForm";
import LeftBanner from "../components/register-shop-comps/LeftBanner";
import RightBanner from "../components/register-shop-comps/RightBanner";

const AddShop = () => {
  const { id } = useParams();

  return (
    <Box className="shop-banner">
      <Stack
        sx={{
          backgroundColor: "rgb(0,0,0,0.7)",
          height: "100%",
          letterSpacing: { xs: "0.4rem", md: "0.7rem" },
        }}
        direction={{ xs: "column", md: "row" }}
        alignItems="center"
      >
        <LeftBanner />
        <Box overflowY={{ md: "scroll" }}>
          {id ? <ShopForm id={id} /> : <RightBanner />}{" "}
        </Box>
      </Stack>
    </Box>
  );
};

export default AddShop;
