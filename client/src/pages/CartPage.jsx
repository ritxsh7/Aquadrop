import React, { useEffect, useState } from "react";

//styles
import "../styles/CartPage.css";
import CartProduct from "../components/cart-comps/cartProduct";
import emptyCart from "../images/empty.webp";
import SmallLoader from "../components/general-comps/SmallLoader";

//store
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { calculateTotal, clearCart } from "../features/cart";

//router
import { NavLink, useNavigate } from "react-router-dom";

//backend
import axios from "axios";
import OrderSuccessfull from "../components/orders-comps/OrderSuccessfull";
import Address from "../components/cart-comps/Address";

const CartPage = () => {
  //stores
  const cart = useSelector((store) => store.cart);
  const user = useSelector((store) => store.user);
  let { token, address } = user;
  const dispatch = useDispatch();

  //states
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [err, setErr] = useState("");

  //router
  const navigate = useNavigate();

  //backend
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  //placing order endpoint
  const placeOrder = async () => {
    try {
      if (!address) {
        alert("Address is required for placing an order !");
        return;
      }
      setLoading(true);
      const response = await axios.post(
        `${backendUrl}/user/order/${user.name}`,
        {
          order: cart,
          token,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTimeout(() => {
        dispatch(clearCart());
        dispatch(calculateTotal());
        setLoading(false);
        setSuccess(response?.data?.message);
      }, 3000);
    } catch (error) {
      setErr(error?.response?.data?.message);
      if (err === "Invalid token") {
        window.location.reload();
        navigate("/");
      }
      setLoading(false);
    }
  };

  return (
    <>
      <div className="cart-page-user">
        {cart.total > 0 ? (
          <div className="cart-status">
            <div className="delivery-address">
              <p>
                Deliver to : <b>{user.name}</b>
              </p>
              {/* ==============UPDATE OR DISPLAY ADDRESSES============= */}
              <Address />
            </div>

            <ul className="cart-list-ul">
              {cart.items.map((item) => (
                <li key={item.id}>
                  <CartProduct {...item} />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="no-items-cart" style={{ margin: "0 auto" }}>
            <img
              style={{ height: "30vh", width: "30vh", borderRadius: "0.5rem" }}
              src={emptyCart}
            ></img>
            <h2 style={{ fontWeight: "500" }}>No items in the cart !</h2>
            <p style={{ marginTop: "1rem", color: "grey" }}>
              {" "}
              Add Items to view your cart
            </p>
            <NavLink to="/">
              <button className="place-order" style={{ margin: "1rem 0" }}>
                Explore shops
              </button>
            </NavLink>
          </div>
        )}
        {cart.total > 0 && (
          <div className="cart-price">
            <h2
              style={{
                paddingBottom: "0.5rem",
                borderBottom: "1px solid grey",
              }}
            >
              PRICE DETAILS
            </h2>
            <table className="pricing-table">
              <tbody>
                <tr>
                  <td>Price ({cart.total})</td>
                  <td>₹{cart.price}</td>
                </tr>
                <tr style={{ borderTop: "1px solid black" }}>
                  <td>
                    <b>Total Amount</b>
                  </td>
                  <td>
                    <b>₹{cart.price}</b>
                  </td>
                </tr>
              </tbody>
            </table>

            <SmallLoader loading={loading} />
            {err && <p style={{ color: "red", textAlign: "center" }}>{err}</p>}
            {success && (
              <p style={{ color: "limegreen", textAlign: "center" }}>
                {success}
              </p>
            )}
            <button className="place-order" onClick={placeOrder}>
              Place Order
            </button>
          </div>
        )}
      </div>
      <OrderSuccessfull success={success} setSuccess={setSuccess} />
    </>
  );
};

export default CartPage;
