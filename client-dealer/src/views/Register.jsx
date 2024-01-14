import { Container } from "@mui/material";
import React from "react";
import SellerLogin from "../components/seller-auth-comps/SellerLogin";
import Login from "../components/seller-auth-comps/Login";

const Register = () => {
  //=============VIEW============

  return (
    <Container
      fixed
      sx={{
        padding: "0",
      }}
    >
      <SellerLogin />
    </Container>
  );
};

export default Register;
