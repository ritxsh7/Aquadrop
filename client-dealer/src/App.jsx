import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  //store setup
  const auth = useSelector((store) => store.dealer);
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const getDealerInfo = async () => {
      dispatch(toggleLoading(true));

      const { response, err } = await dashboard.getDealerInfo();
      if (response) {
        setIsLogin(true);
        dispatch(saveDealer(response));
      }
      if (err) {
        console.log(err);
        dispatch(logoutDealer());
        setIsLogin(false);
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
