import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//mui setup
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./utils/theme/theme";

import { useDispatch } from "react-redux";

//pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Shop from "./pages/Shop";
import CartPage from "./pages/CartPage";
import ProtectedPage from "./components/general-comps/ProtectedPage";
import Orders from "./pages/Orders";
import Header from "./components/menu-comps/Header";
import Footer from "./components/menu-comps/Footer";
import { useEffect } from "react";
import { SaveLocation } from "./features/user";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            dispatch(
              SaveLocation({
                longitude: position.coords.longitude,
                lattitude: position.coords.latitude,
              })
            );
          },
          (error) => {
            console.log(error);
          }
        );
      }
    };
    getLocation();
  }, [navigator.geolocation]);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Header />
          <Routes>
            <Route exact path="/" element={<LandingPage />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/signup" element={<Signup />}></Route>
            <Route exact path="/shop/:id" element={<Shop />}></Route>
            <Route
              exact
              path="/cart/:id"
              element={
                <ProtectedPage>
                  <CartPage />
                </ProtectedPage>
              }
            ></Route>
            <Route
              exact
              path="/orders/:id"
              element={
                <ProtectedPage>
                  <Orders />
                </ProtectedPage>
              }
            ></Route>
          </Routes>
          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
};

export default App;
