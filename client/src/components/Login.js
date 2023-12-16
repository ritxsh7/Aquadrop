import React from "react";
import LoginSticker from "../images/sticker.png";
import Loader from "./Loader";
import SmallLoader from "./SmallLoader";

//backend and states and stores
import { useEffect, useRef } from "react";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/user";
import { useNavigate } from "react-router-dom";

const serverUrl = process.env.REACT_APP_BACKEND_URL;
console.log(serverUrl);

export default function Login() {
  //============================NAVIGATION===========================
  const navigate = useNavigate();

  //=================setup store and state==========================
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  //========================functions==================================

  //1. LOGIN FUNC
  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/user/login/`,
        {
          email,
          password,
        }
      );
      console.log(response?.data?.data);
      const userData = response.data.data;
      dispatch(loginUser(userData));
      window.localStorage.setItem("aqua-user", JSON.stringify(userData));
      window.localStorage.setItem("token", userData.token);
      window.localStorage.setItem("isLoggedIn", true);
      setSuccess(response.data.message);
      setTimeout(() => {
        setLoading(false);
        // window.history.back();
        navigate("/");
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
          placeholder="Email Id"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          name="password"
          id="em"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <input type="button" id="loginup" value="Login" onClick={handleLogin} />

        {error && <p style={{ color: "red", textAlign: "center" }}>{errMsg}</p>}
        {success && (
          <p style={{ color: "limegreen", textAlign: "center" }}>
            {success}
            <SmallLoader />
          </p>
        )}

        <Loader loading={loading} />

        <p className="sign-up">
          Not a member?
          <a href="/signup" id="signup">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}
