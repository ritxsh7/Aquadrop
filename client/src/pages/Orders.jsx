import React, { useEffect, useState } from "react";
import Order from "../components/Order";
import Header from "../components/Header";

//styles
import "../styles/Orders.css";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

const Orders = () => {
  //states
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState(null);

  const { email, token } = useSelector((store) => store.user);
  // console.log(token);

  //backend
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  // console.log(backendUrl);

  const getOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${backendUrl}/user/get-orders/${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders(response?.data?.data?.reverse());
      // console.log(orders);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getOrders();
  }, [email]);

  return (
    <>
      <Header />
      <div className="orders-page">
        <h2>Your recent orders</h2>
        <Loader loading={loading} />
        <div id="orders-container">
          {orders?.map((item, i) => {
            return <Order key={i} {...item} />;
          })}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Orders;
