import React, { useEffect, useState } from "react";
import Header from "../components/Header";

//styles
import "../styles/Shop.css";
import Loader from "../components/Loader";
import ratingStar from "../images/ratingStar.png";
import ProductCard from "../components/ProductCard";

//routers
import { useParams } from "react-router-dom";
import axios from "axios";

const Shop = () => {
  const { id } = useParams();
  // console.log(id);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [shop, setShop] = useState({});

  const getShopDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/api/v1/get-shop/${id}`
      );
      let { shop } = await response.data;
      console.log(shop);
      setShop(shop);
    } catch (err) {
      console.log(err.message);
      setErr(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getShopDetails();
  }, []);

  return (
    <div className="shop">
      <Header />
      <Loader loading={loading} />
      <div className="shop-page">
        <div className="shop-details">
          <div className="shop-banner">
            <div className="shop-name">
              <h2>{shop?.name}</h2>
              <p>
                {shop?.address?.area} {shop?.address?.city}
              </p>
              <p
                style={{
                  fontWeight: "200",
                }}
              >
                2.3KM
              </p>
              <div className="shop-rating">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img src={ratingStar}></img>
                  <p
                    style={{
                      display: "inline",
                    }}
                  >
                    {shop?.rating}
                  </p>
                </div>
                <p
                  style={{
                    fontWeight: "bold",
                    borderTop: "1px solid whitesmoke",
                  }}
                >
                  {shop?.reviews?.length}+ ratings
                </p>
              </div>
            </div>
            <img src={shop?.image}></img>
          </div>
        </div>
        <div className="order-section">
          <h1>Products available : </h1>
          <div>
            {shop?.products?.map((p) => {
              return <ProductCard key={p._id} {...p} shopId={shop?._id} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
