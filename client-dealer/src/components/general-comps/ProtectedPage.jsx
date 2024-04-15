import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedPage = ({ isLogin }) => {
  const { login } = useSelector((store) => store.dealer);
  return login ? <Outlet /> : <Navigate to="/dealer/register" />;
};

export default ProtectedPage;
