import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Order = (props) => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const { token } = useSelector((store) => store.user);

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
      console.log(response.data);
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
        {props?.name?.map((item, i) => (
          <p>{`${i + 1}.  ${item}`}</p>
        ))}
      </div>
      {/* <p>{props.timeP.toString() + "/t" + props.timeD.toString()}</p> */}
      <p className="price">₹ {props.price}</p>

      {/* if delivered then display date or diplay cancel button */}
      {Date.now() > props.timeD ? (
        <div>
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
