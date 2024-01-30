import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { dealerShop } from "../../api/modules/shop";
import { useDispatch } from "react-redux";
import { toggleLoading } from "../../redux/features/dealer";

const Name = ({ shop, setShop }) => {
  const [next, setNext] = useState(false);
  const [areas, setAreas] = useState(null);
  const dispatch = useDispatch();

  const getPincode = async (pincode) => {
    dispatch(toggleLoading(true));
    const { response, err } = await dealerShop.getPincode(pincode);
    if (response) {
      setAreas(response[0].PostOffice);
    }
    if (err) console.log(err);
    dispatch(toggleLoading(false));
    setNext(true);
  };

  const handleChange = (e) => {
    setShop({ ...shop, locality: e.target.value });
  };

  return (
    <Box width="85%" maxWidth="450px" mt={{ xs: "1rem", md: "4rem" }}>
      <Typography variant="h3">Give your shop a name?</Typography>
      <TextField
        variant="standard"
        label="Shop Name"
        type="text"
        placeholder="Give your shop a name"
        fullWidth
        onChange={(e) => setShop({ ...shop, name: e.target.value })}
        sx={{
          my: "1rem",
          fontSize: "2rem",
          "& .MuiInputBase-root": {
            color: "#4b4b4b",
            fontSize: { md: "2rem" },
          },
        }}
      />
      <Typography variant="h3">Zipcode of your area?</Typography>
      <TextField
        variant="standard"
        label="Zip Code"
        type="text"
        placeholder="Enter Zipcode e.g 411018"
        fullWidth
        onChange={(e) => setShop({ ...shop, pincode: e.target.value })}
        sx={{
          my: "1rem",
          fontSize: "2rem",
          "& .MuiInputBase-root": {
            color: "#4b4b4b",
            fontSize: { md: "2rem" },
          },
        }}
      />
      {!next && (
        <Button
          variant="contained"
          fullWidth
          component={NavLink}
          onClick={() => {
            getPincode(shop.pincode);
          }}
          disabled={shop.name && shop.pincode ? false : true}
          sx={{ backgroundColor: "#000", my: "1rem" }}
        >
          Next
        </Button>
      )}
      {next && (
        <>
          <Typography variant="h3">What's your locality?</Typography>
          <FormControl fullWidth>
            <Select
              placeholder="Locality"
              sx={{ my: "1rem" }}
              value={shop.locality}
              label="Locality"
              onChange={handleChange}
            >
              {areas.map((area) => (
                <MenuItem value={area.Name}>{area.Name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            fullWidth
            component={NavLink}
            to="/dealer/register-shop/register/2"
            disabled={shop.name && shop.pincode && shop.locality ? false : true}
            sx={{ backgroundColor: "#000", my: "1rem" }}
          >
            Next
          </Button>
        </>
      )}
    </Box>
  );
};

export default Name;
