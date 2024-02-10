//styles and comps
import "../../styles/Login.css";
import Loader from "../general-comps/Loader";
import SmallLoader from "../general-comps/SmallLoader";
import LoginSticker from "../../images/sticker.png";
import { GoogleButton } from "react-google-button";
import { signinWithGoogle } from "../../Config/googleAuth";
//store and states
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/user";

//connect backend
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  //setup store
  const [username, setUserName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  //states for signup
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");
  const [pincode, setPincode] = useState(0);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  //signup function
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isNaN(pincode)) {
      setLoading(false);
      setError(true);
      setErrMsg("Enter valid Pincode");
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/user/signup`, {
        name,
        email,
        password,
        pincode,
        role: "Customer",
      });
      setSuccess(response.data.message);
      setTimeout(() => {
        setUserName(user?.name);
        setLoading(false);
        navigate("/login");
      }, 3000);
    } catch (err) {
      setLoading(false);
      setError(true);
      setErrMsg(err.response.data.message);
    }
  };

  //component
  return (
    <div class="form-info">
      <div className="login-left">
        <h3>New user?</h3>
        <p>
          Sign Up to order fresh drinking water and get delivered at your
          doorsteps.
        </p>
        <img src={LoginSticker}></img>
      </div>

      <form action="">
        <input
          type="text"
          name="name"
          id=""
          placeholder="Your Full Name"
          required
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          name="email"
          id=""
          placeholder="Email Id"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          id=""
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          name="pincode"
          id=""
          placeholder="Pincode"
          required
          onChange={(e) => setPincode(e.target.value)}
        />

        <Loader loading={loading} />

        <button
          value="Sign In"
          className="login-btn"
          disabled={loading}
          onClick={handleSignUp}
        >
          Sign In
        </button>
        {error && <p style={{ color: "red" }}>{errMsg}</p>}
        {success && (
          <p style={{ color: "limegreen", textAlign: "center" }}>
            {`${success}, Redirecting to Login...`}
            <SmallLoader />
          </p>
        )}
        <GoogleButton
          onClick={async () => {
            const user = await signinWithGoogle();
            dispatch(loginUser(user));
            window.localStorage.setItem("aqua-user", JSON.stringify(user));
            window.localStorage.setItem("isLoggedIn", "true");
            window.history.back();
          }}
          style={{
            width: "80%",
            textAlign: "center",
          }}
        />
        <p className="sign-up">
          Already a user?
          <a href="/login" id="signup">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
