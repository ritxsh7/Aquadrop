import React from "react";

//styles
import "../styles/CartPage.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartProduct from "../components/cartProduct";
import emptyCart from "../images/empty.webp";

//store
import { useSelector } from "react-redux/es/hooks/useSelector";

//router
import { NavLink } from "react-router-dom";

const CartPage = () => {
  //stores
  const cart = useSelector((store) => store.cart);
  const user = useSelector((store) => store.user);
  console.log(cart);

  return (
    <>
      <Header />

      <div className="cart-page-user">
        {cart.total > 0 ? (
          <div className="cart-status">
            <div className="delivery-address">
              <p>
                Deliver to : <b>{user.name}</b>
              </p>
              <p
                style={{
                  color: "grey",
                  marginTop: "0.7rem",
                }}
              >
                Flat no. 7, Ashirwad Appartment, Maitri chowk, Sant Tukaram
                Nagar, Pimpri, Pimpri Chinchwad, Maharashtra - 411018
              </p>
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
          <div className="no-items-cart">
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
        <div className="cart-price">
          <h2
            style={{ paddingBottom: "0.5rem", borderBottom: "1px solid grey" }}
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
          <button className="place-order">Place Order</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
