import React, { useState } from "react";
import { Container, TextField, Button, Typography, Alert } from "@mui/material";

//stores
import { useDispatch } from "react-redux";
import { loginDealer, toggleLoading } from "../../redux/features/dealer";

//backend
import { useNavigate } from "react-router-dom";
import { authApi } from "../../api/modules/auth";

const Login = ({ setAuthState }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    phone: "",
    password: "",
  });

  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSellerLogin = async () => {
    dispatch(toggleLoading(true));
    const { response, err } = await authApi.login(details);
    console.log(response);
    if (response) {
      dispatch(loginDealer(response));
      setErr(false);
      setSuccess(true);
      setTimeout(() => {
        navigate("/");
        dispatch(toggleLoading(false));
      }, 2000);
    }
    if (err) {
      console.log(err);
      setErr(true);
      setErrMsg(err.message);
      dispatch(toggleLoading(false));
    }
  };

  return (
    <Container sx={{ padding: "0" }}>
      <TextField
        id="Name"
        label="Phone No"
        variant="outlined"
        type="tel"
        required={true}
        sx={{
          width: "100%",
          backgroundColor: "white",
          margin: "0.4rem 0",
          fontSize: "0.7rem",
        }}
        onChange={(e) => setDetails({ ...details, phone: e.target.value })}
      />
      <TextField
        id="password"
        label="Password"
        variant="outlined"
        type="password"
        sx={{
          width: "100%",
          backgroundColor: "white",
          margin: "0.4rem 0",
          fontSize: "0.7rem",
        }}
        onChange={(e) => setDetails({ ...details, password: e.target.value })}
      />
      <Typography component="p" align="center">
        Not registered yet?
        <span
          style={{
            color: "dodgerblue",
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={() => setAuthState({ view: "register" })}
        >
          Register here
        </span>
      </Typography>
      <Button
        variant="contained"
        fullWidth
        sx={{ width: "100%", height: "3rem", margin: "1rem 0" }}
        onClick={handleSellerLogin}
      >
        Login
      </Button>
      {(success || err) && (
        <Alert severity={err ? "error" : "success"}>
          {err ? errMsg : "Login Successful"}
        </Alert>
      )}
    </Container>
  );
};

export default Login;
