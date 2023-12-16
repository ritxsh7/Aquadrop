import React from "react";
import { useNavigate } from "react-router-dom";

const LogOut = ({ isLogoutOpen, setIsLogoutOpen }) => {
  //====NAVIGATIOIN======
  const navigate = useNavigate();

  //LOGOUT FUNCTION=================
  const handleLogout = () => {
    window.localStorage.setItem("isLoggedIn", false);
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("aqua-user");
    setIsLogoutOpen(false);
    navigate("/");
    window.location.reload();
  };

  return (
    isLogoutOpen && (
      <div className="logout-dialog">
        <div className="close-x" onClick={() => setIsLogoutOpen(false)}>
          <ion-icon name="close-circle-sharp"></ion-icon>
        </div>
        <h2>Are you sure to log out of this device ?</h2>
        <button onClick={handleLogout}>
          <b>LOGOUT</b>
        </button>
      </div>
    )
  );
};

export default LogOut;
