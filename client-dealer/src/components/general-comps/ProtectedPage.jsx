import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedPage = ({ children }) => {
  const navigate = useNavigate();

  const { login } = useSelector((store) => store.dealer);

  const IsLogin = new Promise((resolve, reject) => {
    if (login) resolve(true);
    else reject(false);
  });

  useEffect(() => {
    const CheckLogin = async () => {
      const result = await IsLogin();
      if (!result) navigate("/dealer/register");
    };
    CheckLogin();
  }, [login]);

  return login ? <>{children}</> : "";
};

export default ProtectedPage;
