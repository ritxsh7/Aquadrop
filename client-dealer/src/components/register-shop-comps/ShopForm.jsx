import { Alert, Stack, Box } from "@mui/material";
import React, { useState } from "react";
import SellerSteps from "../seller-auth-comps/SellerSteps";
import Name from "./Name";
import Address from "./Address";
import Summary from "./Summary";
import ConfirmAddress from "./ConfirmAddress";
import UploadImage from "./UploadImage";

const ShopForm = ({ id }) => {
  const forms = [Name, Address, ConfirmAddress, Summary, UploadImage];
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
    coordinates: "",
    pincode: "",
    area: "",
  });

  const [isErr, setIsErr] = useState(false);
  const [err, setErr] = useState(false);

  return (
    <Stack
      alignItems="center"
      textAlign="center"
      width={{ xs: "100vw", md: "100%" }}
      my="auto"
      letterSpacing="normal"
      p="1rem 0"
      height={{ md: "100vh" }}
      minHeight="60vh"
      sx={{ overflowY: { md: "scroll" } }}
    >
      <SellerSteps activeStep={1} style />
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
