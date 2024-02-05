import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { theme } from "./utils/theme/theme";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutDealer,
  saveDealer,
  toggleLoading,
} from "./redux/features/dealer";
import { useEffect, useState } from "react";

//========================PAGES======================
import Register from "./views/Register";
import Navbar from "./components/general-comps/Navbar";
import Dashboard from "./views/Dashboard";
import Loader from "./components/general-comps/Loader";
import dashboard from "./api/modules/dashboard";
import AddShop from "./views/AddShop";

function App() {
  //store setup
  const dealer = useSelector((store) => store.dealer);
  const dispatch = useDispatch();

  useEffect(() => {
    const getDealerInfo = async () => {
      dispatch(toggleLoading(true));

      const { response, err } = await dashboard.getDealerInfo();
      if (response) {
        dispatch(saveDealer(response));
      }
      if (err) {
        console.log(err);
        dispatch(logoutDealer());
      }
      dispatch(toggleLoading(false));
    };
    getDealerInfo();
  }, [dispatch]);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <>
          <Navbar />
          <Routes>
            <Route
              exact
              path="/dealer/register"
              element={
                dealer.login ? <Navigate replace to="/" /> : <Register />
              }
            ></Route>
            <Route
              exact
              path="/"
              element={
                dealer.login ? (
                  <Dashboard />
                ) : (
                  <Navigate replace to="/dealer/register" />
                )
              }
            ></Route>
            <Route
              exact
              path="/dealer/register-shop/"
              element={<AddShop />}
            ></Route>
            <Route
              exact
              path="/dealer/register-shop/register/:id"
              element={<AddShop />}
            ></Route>
          </Routes>
          <Loader loading={dealer.loading} />
        </>
      </ThemeProvider>
    </Router>
  );
}

export default App;
