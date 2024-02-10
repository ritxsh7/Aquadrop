import React from "react";
import LoginSticker from "../../images/sticker.png";
import Loader from "../general-comps/Loader";
import SmallLoader from "../general-comps/SmallLoader";
import { GoogleButton } from "react-google-button";
import login from "../../utils/styles/login";

//backend and states and stores
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/user";
import { NavLink, useNavigate } from "react-router-dom";

//auth
import { signinWithGoogle } from "../../Config/googleAuth";
import { demoEmail, demoPass } from "../../utils/constants/demo";
import { Button } from "@mui/material";

export default function Login() {
  //============================NAVIGATION===========================
  const navigate = useNavigate();

  //=================setup store and state==========================
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [isDemo, setIsDemo] = useState(false);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  //========================FUNCTIONS==================================

  //1. LOGIN FUNC
  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/user/login/`, {
        email,
        password,
      });
      const userData = response.data.data;
      dispatch(loginUser(userData));
      window.localStorage.setItem("aqua-user", JSON.stringify(userData));
      window.localStorage.setItem("isLoggedIn", "true");
      setSuccess(response.data.message);
      setTimeout(() => {
        setLoading(false);
        window.history.back();
      }, 2000);
    } catch (err) {
      setLoading(false);
      setError(true);
      setErrMsg(
        err.message === "Network Error"
          ? "Server is currently busy"
          : err.response.data.message
      );
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { email, displayName } = await signinWithGoogle();
      try {
        const response = await axios.post(`${backendUrl}/user/google-auth/`, {
          name: displayName,
          email,
        });
        const user = response.data.data;
        dispatch(loginUser(user));
        window.localStorage.setItem("aqua-user", JSON.stringify(user));
        window.localStorage.setItem("isLoggedIn", "true");
        window.history.back();
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user?.name) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="form-info">
      <div className="login-left">
        <h3>Already a user?</h3>
        <p>
          Login to order fresh drinking water and get delivered at your
          doorsteps.
        </p>
        <img src={LoginSticker}></img>
      </div>
      <form action="">
        <input
          type="email"
          name="email"
          id="nm"
          value={email}
          placeholder="Email Id"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          id="em"
          value={password}
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{ color: "red", textAlign: "center" }}>{errMsg}</p>}
        {success && (
          <p style={{ color: "limegreen", textAlign: "center" }}>
            {success}
            <SmallLoader loading={loading} />
          </p>
        )}
        <button
          value="Login"
          className="login-btn"
          disabled={loading}
          onClick={handleLogin}
        >
          Login
        </button>

        <Loader loading={loading} />
        <GoogleButton
          onClick={handleGoogleLogin}
          style={login.signinWithGoogle}
          disabled={loading}
          className="goole-btn"
        />
        <p className="sign-up" style={{ margin: "1rem 0" }}>
          Not a member?
          <NavLink to="/signup" id="signup">
            Sign up
          </NavLink>
        </p>
        {!isDemo && (
          <>
            <h2 style={{ margin: "1rem 0", color: "black" }}>OR</h2>
            <Button
              variant="outlined"
              sx={{ width: "80%" }}
              onClick={(e) => {
                setEmail(demoEmail);
                setPassword(demoPass);
                setIsDemo(true);
              }}
            >
              Use Demo Account
            </Button>
          </>
        )}
      </form>
    </div>
  );
}
