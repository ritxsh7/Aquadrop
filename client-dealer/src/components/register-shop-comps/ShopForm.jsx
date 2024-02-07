import { Alert, Stack, Box } from "@mui/material";
import React, { useState } from "react";
import SellerSteps from "../seller-auth-comps/SellerSteps";
import Name from "./Name";
import Address from "./Address";
import Summary from "./Summary";

const ShopForm = ({ id }) => {
  const forms = [Name, Address, Summary];
  const Elem = forms[id - 1];

  const [shop, setShop] = useState({
    name: "",
    address: {
      line1: "",
      line2: "",
      locality: "",
      city: "",
      state: "",
    },
    pincode: "",
    img: "",
  });

  const [isErr, setIsErr] = useState(false);
  const [err, setErr] = useState(false);

  return (
    <Stack
      alignItems="center"
      textAlign="center"
      width={{ xs: "100vw", md: "60vw" }}
      my="auto"
      bgcolor="#DFEEFF"
      letterSpacing="normal"
      p="1rem 0"
      className="shop-form"
      height="95vh"
      maxHeight="95vh"
    >
      <SellerSteps activeStep={1} />
      <Elem
        shop={shop}
        setShop={setShop}
        setErr={setErr}
        isErr={isErr}
        setIsErr={setIsErr}
      />
      {isErr && (
        <Alert severity="error" sx={{ width: "85%", maxWidth: "450px" }}>
          {err}
        </Alert>
      )}
    </Stack>
  );
};

export default ShopForm;
