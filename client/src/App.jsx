import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

//pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Seller from "./pages/Seller";
import Shop from "./pages/Shop";
import CartPage from "./pages/CartPage";
import ProtectedPage from "./components/ProtectedPage";
import Orders from "./pages/Orders";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<LandingPage />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
          <Route exact path="/seller" element={<Seller />}></Route>
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
    </Router>
  );
};

export default App;
