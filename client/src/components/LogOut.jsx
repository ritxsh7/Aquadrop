import React from "react";
import { useNavigate } from "react-router-dom";

const LogOut = ({ isLogout, setIsLogout }) => {
  //====NAVIGATIOIN======
  const navigate = useNavigate();

  //LOGOUT FUNCTION=================
  const handleLogout = () => {
    window.localStorage.setItem("isLoggedIn", false);
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("aqua-user");
    setIsLogout(false);
    navigate("/");
    window.location.reload();
  };

  return (
    <div className={`modal ${isLogout ? "" : "hide-logout"}`}>
      <div className="logout-dialog">
        <div className="close-x" onClick={() => setIsLogout(false)}>
          <ion-icon name="close-sharp"></ion-icon>
        </div>
        <h2>Are you sure to log out of this device ?</h2>
        <button onClick={handleLogout}>
          <b>LOGOUT</b>
        </button>
      </div>
    </div>
  );
};

export default LogOut;
