import { Container } from "@mui/material";
import React from "react";
import SellerLogin from "../components/seller-auth-comps/SellerLogin";
import { useSelector } from "react-redux";

const Register = () => {
  //=============VIEW============

  const { login } = useSelector((store) => store.dealer);

  return (
    login && (
      <Container
        fixed
        sx={{
          padding: "0",
        }}
      >
        <SellerLogin />
      </Container>
    )
  );
};

export default Register;
