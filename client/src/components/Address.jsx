import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import SmallLoader from "./SmallLoader";

const Address = () => {
  const [firstLine, setFirstLine] = useState("");
  const [locality, setLocality] = useState("");
  const [pincode, setPincode] = useState("");
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [err, setErr] = useState("");

  //store
  const { email, token } = useSelector((store) => store.user);

  const updateAddress = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:8080/api/v1/user/update-address/${email}`,
        {
          address: {
            firstLine,
            locality,
            pincode,
          },
          token,
        }
      );
      console.log(response.data);
      setLoading(false);
      setEdit(false);
    } catch (err) {
      console.log(err.response.data.message);
      setErr(err.response.data.message);
      setLoading(false);
    }
  };

  return (
    <>
      {edit ? (
        <form className="address-form">
          <input
            type="text"
            placeholder="House No, Bulding Name, Street"
            onChange={(e) => setFirstLine(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Locality"
            onChange={(e) => setLocality(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Pincode"
            onChange={(e) => setPincode(e.target.value)}
          ></input>
        </form>
      ) : (
        <p
          style={{
            color: "grey",
            margin: "0.4rem 0",
          }}
        >
          Flat no. 7, Ashirwad Appartment, Maitri chowk, Sant Tukaram Nagar,
          Pimpri, Pimpri Chinchwad, Maharashtra - 411018
        </p>
      )}
      <SmallLoader loading={loading} />
      {edit ? (
        <>
          {err && <p style={{ color: "tomato" }}>{err}</p>}

          <button className="change-address" onClick={updateAddress}>
            Update Changes
          </button>
        </>
      ) : (
        <div
          style={{
            color: "dodgerblue",
            margin: "0.2rem 0",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            cursor: "pointer",
          }}
          onClick={() => setEdit(true)}
        >
          <p>Edit address</p>
          <ion-icon name="create-outline"></ion-icon>
        </div>
      )}
    </>
  );
};

export default Address;
