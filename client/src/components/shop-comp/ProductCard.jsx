import React, { useState } from "react";

//styles
import "../../styles/ProductCard.css";

//routes
import { useNavigate } from "react-router-dom";

//store
import { useDispatch, useSelector } from "react-redux";
import { calculateTotal, addTocart, removeCart } from "../../features/cart";

const ProductCard = ({ _id, name, image, price, description, shopId }) => {
  //setup store
  const login = window.localStorage.getItem("isLoggedIn");

  const dispatch = useDispatch();

  //local states
  const [added, setAdded] = useState(false);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //add to cart function
  const addToCart = (e) => {
    console.log(login);
    if (login === "false") {
      setLoading(true);
      navigate("/login");
    } else {
      if (count === 0) {
        alert("Number of items can't be zero");
        return;
      }
      setAdded(!added);
      dispatch(
        addTocart({ _id, name, count, price, image, description, shopId })
      );
      dispatch(calculateTotal());
    }
  };

  const removeFromCart = () => {
    setAdded(!added);
    setCount(0);
    dispatch(removeCart(_id));
    dispatch(calculateTotal());
  };

  return (
    <div className="product-card">
      <div className="left">
        <h1>{name}</h1>
        <p>₹ {price}</p>
        <h5>{description}</h5>
        <div className="cart-definers">
          <button
            className="add-to-cart"
            style={{
              backgroundColor: `${added ? "#B0495A" : "#0195FF"}`,
            }}
            onClick={added ? removeFromCart : addToCart}
          >
            {added ? "Remove from cart" : "Add to card"}
          </button>
          <div className="counter">
            <button
              className="minus"
              onClick={() => {
                if (count != 0) {
                  setCount(count - 1);
                }
              }}
            >
              -
            </button>
            <p>{count}</p>
            <button
              className="plus"
              onClick={() => {
                setCount(count + 1);
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="right">
        <img src={image}></img>
      </div>
    </div>
  );
};

export default ProductCard;
