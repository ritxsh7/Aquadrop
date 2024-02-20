import React from "react";
import ratingStar from "../../images/ratingStar.png";
import { calculateDistance } from "../../utils/constants/distance";
import { useSelector } from "react-redux";

// style
import "../../styles/StoresCard.css";

export default function StoresCard(props) {
  const { location } = useSelector((store) => store.user);
  console.log(props.coordinates);

  let distance;

  if (location && props.coordinates)
    distance = calculateDistance(
      location?.lattitude,
      location?.longitude,
      props.coordinates[1],
      props.coordinates[0]
    );

  return (
    <>
      <div className="storescard">
        <div className="img-div">
          <img className="storecard-image" src={props.image}></img>
        </div>

        <div
          className="stats"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="stats-title">
            <h2 className="storecard-name">{props.name}</h2>

            <div className="storecard-ratings">
              <p>{props.rating}</p>
              <img src={ratingStar}></img>
            </div>
          </div>

          <div
            className="location"
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: 6,
              fontSize: "0.9rem",
              alignItems: "center",
            }}
          >
            <p>
              {props.address.line2} {props.address.city}
            </p>

            <div className="marker">
              <div>
                <ion-icon
                  style={{ display: "block" }}
                  name="location-sharp"
                ></ion-icon>
              </div>
              {location && <p>{distance} KM</p>}
            </div>
          </div>
          <button className="explore-shop-md">Explore products</button>
        </div>
      </div>
      <button className="explore-shop-sm">Explore products</button>
    </>
  );
}
