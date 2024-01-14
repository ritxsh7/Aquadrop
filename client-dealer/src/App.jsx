import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { theme } from "./utils/theme/theme";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutDealer,
  saveDealer,
  toggleLoading,
} from "./redux/features/dealer";
import { useEffect } from "react";

//========================PAGES======================
import Register from "./views/Register";
import Navbar from "./components/general-comps/Navbar";
import Dashboard from "./views/Dashboard";
import Loader from "./components/general-comps/Loader";

function App() {
  //store setup
  const auth = useSelector((store) => store.dealer);
  const dispatch = useDispatch();

  useEffect(() => {
    const getDealerInfo = async () => {
      dispatch(toggleLoading(true));
      try {
        const dealerInfo = await axios.get(
          "http://localhost:8080/api/v1/dealer/info",
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        dispatch(saveDealer(dealerInfo.data));
        dispatch(toggleLoading(false));
      } catch (err) {
        console.log(err);
        dispatch(logoutDealer());
        dispatch(toggleLoading(false));
      }
    };
    getDealerInfo();
  }, [dispatch]);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <>
          <Navbar />
          <Routes>
            <Route exact path="/dealer/register" element={<Register />}></Route>
            <Route exact path="/" element={<Dashboard />}></Route>
          </Routes>
          <Loader loading={auth.loading} />
        </>
      </ThemeProvider>
    </Router>
  );
}

export default App;
