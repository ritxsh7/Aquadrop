import React from "react";

import { useDispatch } from "react-redux";
import { calculateTotal, removeCart } from "../../features/cart";

const blackColor = {
  color: "black",
};

export default function CartProduct(props) {
  const dispatch = useDispatch();
  return (
    <div className="cart-item">
      <img src={props.image} />
      <div className="cart-content">
        <h3 style={{ fontWeight: "500" }}>{props.name}</h3>
        <p style={blackColor}>₹{props.mrp}</p>
        <p>{props.description}</p>
        <p style={{ ...blackColor, marginTop: "0.5rem" }}>
          Quantity: {props.qty}
          <span>{"   |      "}</span>
          Total : ₹{props.mrp * props.qty}
        </p>
        <button
          className="cart-item-remove"
          onClick={() => {
            const id = props.id;
            dispatch(removeCart(id));
            dispatch(calculateTotal());
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
