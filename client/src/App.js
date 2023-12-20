import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  // dotenv.config();
  //store
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("aqua-user"));
    console.log(user);
    if (user) {
      dispatch(loginUser(user));
      const { tokenExpire } = user;
      if (tokenExpire - Date.now() < 0) {
        window.localStorage.removeItem("aqua-user");
      }
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
