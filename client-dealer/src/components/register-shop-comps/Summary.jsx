import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Summary = ({ shop, setShop }) => {
  console.log(shop);
  const navigate = useNavigate();

  useEffect(() => {
    if (!shop.address.line1 && !shop.address.line2 && !shop.locality)
      navigate("/dealer/register-shop/register/1");
  }, [shop]);
  return <Box>Summary here</Box>;
};

export default Summary;
