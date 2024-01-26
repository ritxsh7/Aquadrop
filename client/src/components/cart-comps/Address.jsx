import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAddress } from "../../features/user";
import axios from "axios";
import SmallLoader from "../general-comps/SmallLoader";

const Address = () => {
  const [firstLine, setFirstLine] = useState("");
  const [locality, setLocality] = useState("");
  const [pincode, setPincode] = useState("");
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  //store
  const { email, token, name, role, address } = useSelector(
    (store) => store.user
  );
  const dispatch = useDispatch();

  //backend
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {}, [address]);

  const updateAddress = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${backendUrl}/user/update-address/${email}`,
        {
          address: {
            firstLine,
            locality,
            pincode,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      const newAddress = response?.data?.address;
      dispatch(updateUserAddress(newAddress));
      const newUser = { email, name, role, token, address: newAddress };
      window.localStorage.setItem("aqua-user", JSON.stringify(newUser));
      setLoading(false);
      setEdit(false);
    } catch (err) {
      console.log(err);
      setErr("error");
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
        <div
          style={{
            color: "grey",
            margin: "0.4rem 0",
          }}
        >
          {address ? (
            <p>
              {`${address.firstLine}, ${address.locality}, Pimpri, Pune - `}
              <b>{address.pincode}</b>
            </p>
          ) : (
            <p style={{ color: "tomato" }}>Please provide a delivery address</p>
          )}
        </div>
      )}
      <SmallLoader loading={loading} />
      {edit ? (
        <>
          {err && <p style={{ color: "tomato" }}>{err}</p>}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span
              style={{ fontSize: "1.5rem", cursor: "pointer" }}
              onClick={() => setEdit(false)}
            >
              <ion-icon name="arrow-back-sharp"></ion-icon>
            </span>
            <button className="change-address" onClick={updateAddress}>
              Update Changes
            </button>
          </div>
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
