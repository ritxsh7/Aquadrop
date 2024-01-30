import { Stack } from "@mui/material";
import React, { useState } from "react";
import SellerSteps from "../seller-auth-comps/SellerSteps";
import Name from "./Name";
import Address from "./Address";

const ShopForm = ({ id }) => {
  const forms = [Name, Address];
  const Elem = forms[id - 1];

  const [shop, setShop] = useState({
    name: "",
    address: null,
    locality: "",
    pincode: "",
    img: "",
  });

  return (
    <Stack
      alignItems="center"
      textAlign="center"
      width={{ md: "70vw" }}
      height="100%"
      my="auto"
      bgcolor="#DFEEFF"
      letterSpacing="normal"
      p="1rem 0"
    >
      <SellerSteps activeStep={1} />
      <Elem shop={shop} setShop={setShop} />
    </Stack>
  );
};

export default ShopForm;
