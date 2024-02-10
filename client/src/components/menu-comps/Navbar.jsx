//components and styles
import navItems from "../../utils/constants/navItems";
import "../../styles/cartDialog.css";
import navbar from "../../utils/styles/navbar";

//routers and backend
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

//states and stores
import { useSelector } from "react-redux";
import LogOut from "./LogOut";
import { useEffect, useState } from "react";

function Navbar() {
  //====================ROUTING====================================
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/")[1];

  //===================setup userState===========================
  const user = useSelector((store) => store.user);
  const { total } = useSelector((store) => store.cart);

  //======================FUNCTIONS=================================
  const isLogin = localStorage.getItem("isLoggedIn");

  //states
  const [isLogout, setIsLogout] = useState(false);
  const [isSidebar, setIsSidebar] = useState(window.innerWidth <= 450);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  //==============CLOSING SIDEBAR EVENT LISTENER============

  useEffect(() => {
    const handleClick = (e) => {
      if (isSidebarOpen && !e.target.closest(".sidebar-navbar")) {
        setIsSidebarOpen(!isSidebarOpen);
        console.log("close now");
      }
    };

    if (isSidebarOpen) document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isSidebarOpen, setIsSidebarOpen]);

  // ==========MOBILE SCCREEN DETECTION====================
  useEffect(() => {
    const handleResize = () => {
      setIsSidebar(window.innerWidth <= 450);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="navbar-const">
      {/* ===============================NAVBAR FOR WIDE SCREENS===================================== */}

      <ul>
        {isSidebar ? (
          <div
            style={navbar.sideIcon}
            onClick={() =>
              setTimeout(() => {
                setIsSidebarOpen(!isSidebarOpen);
              }, 50)
            }
          >
            <ion-icon name="menu-sharp"></ion-icon>
          </div>
        ) : (
          // ========================NAVBAR ITEMS=========================

          <>
            {navItems.map(
              (item) =>
                (item.public || isLogin === "true") && (
                  <li key={item.name}>
                    <NavLink to={item.link(user)}>{item.name}</NavLink>
                  </li>
                )
            )}
          </>
        )}

        <li id="login-btn">
          {user ? (
            <div style={navbar.userIcon}>
              <ion-icon name="person-sharp"></ion-icon>
              <h3>{user.name.split(" ")[0]}</h3>
            </div>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </li>
        {isLogin === "true" && (
          <>
            <li>
              <NavLink to={`/cart/${user.name}`}>
                <div className="cart-icon">
                  {total !== 0 && (
                    <div className="cart-icon-badge">{total}</div>
                  )}
                  <ion-icon name="cart"></ion-icon>
                </div>
              </NavLink>
            </li>
            <li>
              <div
                className="logout-btn"
                onClick={() => {
                  setIsLogout(true);
                }}
              >
                <ion-icon name="log-out-outline"></ion-icon>
              </div>
            </li>
          </>
        )}
      </ul>
      {
        // ======================================SIDEBAR FOR MOBILE SCREEN=======================

        <>
          <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
            <div className="sidebar-navbar">
              <header>
                {user && (
                  <div style={navbar.sideIconUser}>
                    <ion-icon name="person-sharp"></ion-icon>
                    <h3>{user.name}</h3>
                  </div>
                )}
              </header>
              <ul className="vertical-sidebar">
                {navItems.map(
                  (item) =>
                    (item.public || isLogin === "true") && (
                      <li
                        key={item.name}
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        <NavLink to={item.link(user)}>
                          <div
                            style={{
                              fontSize: "1.1rem",
                              display: "flex",
                              alignItems: "center",
                              gap: "0.8rem",
                              color: "#4b4b4b",
                            }}
                          >
                            <ion-icon name={item.icon}></ion-icon>
                            <p>{item.name}</p>
                          </div>
                        </NavLink>
                      </li>
                    )
                )}
              </ul>
            </div>
          </aside>
        </>
      }
      <LogOut isLogout={isLogout} setIsLogout={setIsLogout} />
    </div>
  );
}
export default Navbar;
