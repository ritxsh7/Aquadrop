import React, { useEffect, useState } from "react";
import Order from "../components/orders-comps/Order";
import { NavLink } from "react-router-dom";

//styles
import "../styles/Orders.css";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "../components/general-comps/Loader";
import "../styles/Orders.css";
import emptyCart from "../images/empty.webp";

const Orders = () => {
  //states
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState(null);

  const { email, token } = useSelector((store) => store.user);

  //backend
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
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
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    getOrders();
  }, [email]);

  return (
    <>
      <>
        {orders?.length !== 0 ? (
          <div className="orders-page">
            <h2>Your recent orders</h2>
            <Loader loading={loading} />
            <div id="orders-container">
              {orders?.map((item, i) => {
                return <Order key={i} {...item} />;
              })}
            </div>
          </div>
        ) : (
          <section className="empty-orders">
            <div className="no-items-cart" style={{ margin: "0 auto" }}>
              <img
                style={{
                  height: "30vh",
                  width: "30vh",
                  borderRadius: "0.5rem",
                }}
                src={emptyCart}
              ></img>
              <h2 style={{ fontWeight: "500" }}>You have't ordered yet !</h2>
              <p style={{ marginTop: "1rem", color: "grey" }}>
                {" "}
                Shop to view your orders
              </p>
              <NavLink to="/">
                <button className="place-order" style={{ margin: "1rem 0" }}>
                  Explore shops
                </button>
              </NavLink>
            </div>
          </section>
        )}
      </>
    </>
  );
};

export default Orders;
