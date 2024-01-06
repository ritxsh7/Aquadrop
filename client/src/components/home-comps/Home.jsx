import React, { useCallback, useEffect, useState } from "react";
//backend and routes
import { Link } from "react-router-dom";
import axios from "axios";

//components
import StoresCard from "../shop-comp/StoresCard";
import Loader from "../general-comps/Loader";

export default function Home() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  //stores

  useEffect(() => {
    const getTopShops = async () => {
      try {
        const response = await axios.get(`${backendUrl}/get-top-shops`);
        setShops(response.data.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setErr(true);
        setErrMsg(err.message);
      }
    };
    getTopShops();
  }, [backendUrl]);

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
        <article className="shop-by-store">{shopList}</article>
        {err && (
          <p style={{ textAlign: "center", color: "red" }}>
            {errMsg}, check your internet connection
          </p>
        )}
      </section>
    </>
  );
}
