//components and styles
import "../styles/cartDialog.css";

//routers and backend
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

//states and stores
import { useDispatch, useSelector } from "react-redux";
import LogOut from "./LogOut";
import { useState } from "react";
import { loginUser } from "../features/user";

function Navbar() {
  //====================ROUTING====================================
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/")[1];

  //===================setup userState===========================
  const { name } = useSelector((store) => store.user);
  const { total } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  //======================FUNCTIONS=================================
  //1. LOCAL STORAGE
  // const { name } = localStorage.getItem("aqua-user");

  // if (userName) {
  //   dispatch(loginUser({ name: userName }));
  // }
  const isLogin = localStorage.getItem("isLoggedIn");

  //2. LOGOUT DIALOG
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  return (
    <div className="navbar-const">
      <ul>
        <li className={splitLocation === "" ? "active" : ""}>
          <NavLink to="/">Home</NavLink>
        </li>

        <li className={splitLocation === "seller" ? "active" : ""}>
          <NavLink to="/seller">Become a seller </NavLink>
        </li>

        <li>
          <a href="#footer">Contact</a>
        </li>

        <li id="login-btn">
          {name ? <h3>{`H3llo, ${name} !`}</h3> : <a href="/login">Login</a>}
        </li>
        <li>
          <NavLink to={name ? `/cart/${name}` : "/login"}>
            <div className="cart-icon">
              <div className="cart-icon-badge">{total}</div>
              <ion-icon name="cart"></ion-icon>
            </div>
          </NavLink>
        </li>
        <li>
          {isLogin === "true" && (
            <div
              className="logout-btn"
              onClick={() => {
                setIsLogoutOpen(true);
              }}
            >
              <ion-icon name="log-out-outline"></ion-icon>
            </div>
          )}
        </li>
      </ul>
      <LogOut isLogoutOpen={isLogoutOpen} setIsLogoutOpen={setIsLogoutOpen} />
    </div>
  );
}
export default Navbar;
