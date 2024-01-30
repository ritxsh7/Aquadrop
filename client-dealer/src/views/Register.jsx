import { Container } from "@mui/material";
import React from "react";
import SellerLogin from "../components/seller-auth-comps/SellerLogin";
import Login from "../components/seller-auth-comps/Login";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  //=============VIEW============

  const navigate = useNavigate();
  const { login } = useSelector((store) => store.dealer);

  if (login) {
    navigate("/");
  }

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
