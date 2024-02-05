import {
  FormControl,
  Stack,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";

const Address = ({ shop, setShop }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!shop.address.locality) navigate("/dealer/register-shop/register/1");
  }, [shop]);

  return (
    shop.address.locality && (
      <>
        <Stack width="85%" maxWidth="450px">
          <Typography variant="h3">Fill out your address</Typography>
          <TextField
            required
            variant="standard"
            label="Shop No / Block No. / Floor"
            type="text"
            placeholder="e.g Block 7"
            onChange={(e) => {
              setShop({
                ...shop,
                address: { ...shop.address, line1: e.target.value },
              });
            }}
            sx={{
              my: "1rem",
              fontSize: "2rem",
              "& .MuiInputBase-root": {
                color: "#4b4b4b",
                fontSize: { md: "2rem" },
              },
            }}
          />
          <TextField
            required
            variant="standard"
            label=" Building Name, Street Name, Locality"
            type="text"
            placeholder="e.g John Doe Street"
            onChange={(e) => {
              setShop({
                ...shop,
                address: { ...shop.address, line2: e.target.value },
              });
            }}
            sx={{
              my: "1rem",
              fontSize: "2rem",
              "& .MuiInputBase-root": {
                color: "#4b4b4b",
                fontSize: { md: "2rem" },
              },
            }}
          />
          <TextField
            variant="standard"
            label="Area Name"
            type="text"
            placeholder="e.g Shivajinagar"
            disabled
            value={shop.address.locality}
            sx={{
              my: "1rem",
              fontSize: "2rem",
              "& .MuiInputBase-root": {
                color: "#4b4b4b",
                fontSize: { md: "2rem" },
              },
            }}
          />
          <TextField
            disabled
            variant="standard"
            label="Town / City"
            type="text"
            placeholder="e.g Pune"
            value={shop.address.city}
            sx={{
              my: "1rem",
              fontSize: "2rem",
              "& .MuiInputBase-root": {
                color: "#4b4b4b",
                fontSize: { md: "2rem" },
              },
            }}
          />
          <TextField
            disabled
            variant="standard"
            label="State"
            type="text"
            value={shop.address.state}
            placeholder="e.g Gujarat"
            sx={{
              my: "1rem",
              fontSize: "2rem",
              "& .MuiInputBase-root": {
                color: "#4b4b4b",
                fontSize: { md: "2rem" },
              },
            }}
          />
          <Button
            variant="contained"
            fullWidth
            component={NavLink}
            to="/dealer/register-shop/register/3"
            disabled={
              shop.name &&
              shop.pincode &&
              shop.address.locality &&
              shop.address.line1 &&
              shop.address.line2
                ? false
                : true
            }
            sx={{ backgroundColor: "#000", my: "1rem" }}
          >
            Next
          </Button>
        </Stack>
      </>
    )
  );
};

export default Address;
