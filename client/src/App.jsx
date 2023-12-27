import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
// import dotenv from "dotenv";

//pages
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Home from "./components/Home";
import AddProduct from "./components/AddProducts";
import Signup from "./pages/Signup";
import Seller from "./pages/Seller";
import Shop from "./pages/Shop";
import { useDispatch, useSelector } from "react-redux";
import CartPage from "./pages/CartPage";
import { loginUser } from "./features/user";
import Orders from "./pages/Orders";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(user);

    const user = JSON.parse(localStorage.getItem("aqua-user"));
    if (user) {
      const { tokenExpire } = user;
      console.log(tokenExpire - Date.now());
      if (tokenExpire - Date.now() < 0) {
        window.localStorage.removeItem("aqua-user");
        window.localStorage.setItem("isLoggedIn", false);
        window.location.reload();
      } else {
        dispatch(loginUser(user));
        window.localStorage.setItem("isLoggedIn", "true");
      }
    } else {
      window.localStorage.setItem("isLoggedIn", "false");
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
          <Route exact path="/seller" element={<Seller />}></Route>
          <Route exact path="/shop/:id" element={<Shop />}></Route>
          <Route exact path="/cart/:id" element={<CartPage />}></Route>
          <Route exact path="/orders/:id" element={<Orders />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
