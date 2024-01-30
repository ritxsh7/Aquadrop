import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Order = (props) => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const { token } = useSelector((store) => store.user);
  console.log(props);
  //states
  const orderItems = props.name;
  const [fullList, setFullList] = useState(false);

  //===================order cancel======================
  const cancelOrder = async () => {
    try {
      const response = await axios.delete(
        `${backendUrl}/user/order/${props.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      window.location.reload();
    } catch (err) {
      console(err.response.data);
    }
  };

  const date = new Date(props.timeD);

  return (
    <div className="order">
      <img src={props.image} alt="Product 1"></img>
      <div className="names">
        <div className="always-show">
          <p>1. {orderItems[0]}</p>
          {orderItems[1] && <p>2. {orderItems[1]}</p>}
        </div>
        <p
          className={`${
            !fullList && orderItems.length > 2
              ? "more-orders"
              : "no-more-orders"
          }`}
          style={{ color: "#4b4b4b", cursor: "pointer" }}
          onClick={() => setFullList(true)}
        >{`View more ${orderItems.length - 2} orders...`}</p>
        {orderItems.length > 2 && (
          <div className={`no-more-orders ${fullList ? "more-orders" : ""}`}>
            {orderItems.map((item, i) =>
              i < 2 ? "" : <p>{`${i + 1}.  ${item}`}</p>
            )}
            {orderItems.map((item, i) =>
              i < 2 ? "" : <p>{`${i + 1}.  ${item}`}</p>
            )}
            <p
              style={{ cursor: "pointer", color: "#4b4b4b" }}
              onClick={() => setFullList(false)}
            >
              Collapse list ^
            </p>
          </div>
        )}
      </div>
      <p className="price">₹ {props.price}</p>
      {props.timeD ? (
        <div className="timestamp">
          {date.toString().slice(4, 16)}
          <br />
          <p
            style={{
              color: "darkgray",
              margin: "0",
              height: "0",
            }}
          >
            {date.toLocaleString().slice(11)}
          </p>
          <br />
          <p style={{ marginTop: "0.2rem", color: "limegreen" }}>Delivered</p>
        </div>
      ) : (
        <button className="detail" onClick={() => cancelOrder()}>
          Cancel
        </button>
      )}
    </div>
  );
};

export default Order;
