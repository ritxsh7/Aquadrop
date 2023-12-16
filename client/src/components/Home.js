import React, { useCallback, useEffect, useState } from "react";
//backend and routes
import { Link } from "react-router-dom";
import axios from "axios";

//components
import StoresCard from "./StoresCard";
import Loader from "./Loader";
import Footer from "./Footer";

export default function Home() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  //stores

  const getTopShops = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/get-top-shops`
      );
      setShops(response.data.data);
      console.log(shops);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setErr(true);
      setErrMsg(err.message);
      console.log(errMsg);
    }
  }, [shops]);

  useEffect(() => {
    getTopShops();
  }, []);

  const shopList = shops.map((shop) => {
    return (
      <Link
        key={shop._id}
        to={`shop/${shop.name}`}
        style={{ textDecoration: "none" }}
      >
        <StoresCard key={shop._id} {...shop} />
      </Link>
    );
  });

  return (
    <>
      <section className="homepage" id="homepage">
        <Loader loading={loading} />

        <div className="home-header">
          <h1>Explore the shops near you</h1>
          <p>
            We now deliver different types of bottled water. To Drink the best
            water please come to us and give us order and take safe and sound
            water for you.
          </p>
        </div>
        <div className="horizon"></div>
        <div className="shop-by-store">
          {shopList}
          {shopList}
        </div>
        {err && (
          <p style={{ textAlign: "center", color: "red" }}>
            {errMsg}, check your internet connection
          </p>
        )}
      </section>
    </>
  );
}
