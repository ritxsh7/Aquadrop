import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedPage = ({ children }) => {
  const { token } = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
      navigate("/login");
    }
  });

  return token ? children : null;
};

export default ProtectedPage;
