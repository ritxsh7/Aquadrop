import React from "react";
import { useState } from "react";

//data
import sellerLogin from "../../utils/constants/sellerLogin";

//style
import { Typography, TextField, Button, Container, Alert } from "@mui/material";
import { NavLink } from "react-router-dom";

const SellerSignIn = () => {
  //================================STATES AND STORES=================
  const [alert, setAlert] = useState(false);

  return (
    <Container sx={{ margin: { md: "1rem" }, padding: "0" }}>
      {sellerLogin.map((item) => (
        <TextField
          id={item.name}
          label={item.name}
          variant="outlined"
          type={item.type}
          sx={{
            width: "100%",
            backgroundColor: "white",
            margin: "0.4rem 0",
            fontSize: "0.7rem",
          }}
        />
      ))}
      <Typography component="p" align="center">
        Already registered?{" "}
        <NavLink to="/seller/login" style={{ color: "dodgerblue" }}>
          Login
        </NavLink>
      </Typography>
      <Button
        sx={{ width: "100%", height: "3rem", margin: "1rem 0" }}
        variant="contained"
        onClick={() => setAlert(true)}
      >
        Join as Seller
      </Button>
      {alert && (
        <Alert severity="warning">
          We're currently working on this seciton. Please stayed tuned :)
        </Alert>
      )}
    </Container>
  );
};

export default SellerSignIn;
