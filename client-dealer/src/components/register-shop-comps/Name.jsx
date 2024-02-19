import React, { useState } from "react";
import {
  Stack,
  TextField,
  Typography,
  Button,
  Select,
  Box,
  MenuItem,
  FormControl,
} from "@mui/material";

import { RegisterShopStyles } from "../../utils/styles";
import { NavLink } from "react-router-dom";
import { dealerShop } from "../../api/modules/shop";
import { useDispatch } from "react-redux";
import { toggleLoading } from "../../redux/features/dealer";

const Name = ({ shop, setShop, isErr, setErr, setIsErr }) => {
  const [next, setNext] = useState(false);
  const [areas, setAreas] = useState(null);
  const dispatch = useDispatch();

  const getPincode = async (pincode) => {
    dispatch(toggleLoading(true));
    const { response, err } = await dealerShop.getPincode(pincode);
    if (response) {
      setIsErr(false);
      setAreas(response[0].PostOffice);
      setNext(true);
    }
    if (err) {
      setIsErr(true);
      setErr(err);
    }
    dispatch(toggleLoading(false));
  };

  const handleChange = async (e) => {
    const name = e.target.value;
    const details = await areas.filter((area) => area.Name === name);
    setShop({
      ...shop,
      address: {
        city: details[0].Block,
        state: details[0].State,
        locality: name,
      },
    });
  };

  return (
    <Stack
      width="85%"
      maxWidth="450px"
      gap="1rem"
      mt={{ xs: "1rem", md: "4rem" }}
    >
      <Box>
        <Typography variant="h5" color="white" textAlign="left">
          Give your shop a name?
        </Typography>
        <TextField
          variant="outlined"
          type="text"
          placeholder="Give your shop a name"
          fullWidth
          value={shop.name}
          onChange={(e) => setShop({ ...shop, name: e.target.value })}
          sx={RegisterShopStyles.TextInput}
        />
      </Box>
      <Box>
        <Typography variant="h5" color="white" textAlign="left">
          Zipcode of your area?
        </Typography>
        <TextField
          variant="outlined"
          type="text"
          placeholder="Enter Zipcode e.g 411018"
          value={shop.pincode}
          fullWidth
          onChange={(e) => setShop({ ...shop, pincode: e.target.value })}
          className="shop-register-inputs"
          sx={RegisterShopStyles.TextInput}
        />
      </Box>
      {!next && (
        <Button
          variant="contained"
          fullWidth
          component={NavLink}
          onClick={() => {
            getPincode(shop.pincode);
          }}
          disabled={shop.name && shop.pincode ? false : true}
          sx={{ backgroundColor: "#fff", my: "1rem", color: "dodgerblue" }}
        >
          Next
        </Button>
      )}
      {next && (
        <>
          <Typography variant="h5" color="white" textAlign="left">
            What's your locality?
          </Typography>
          <FormControl fullWidth>
            <Select
              placeholder="Locality"
              value={shop.address.locality}
              sx={{
                color: "white", // Text color

                "& .MuiSelect-root": {
                  border: "1px solid white",
                },
                "& .MuiSelect-outlined": {
                  border: "2px solid white", // Border color
                },
              }}
              label="Locality"
              onChange={handleChange}
            >
              {areas.map((area, i) => (
                <MenuItem value={area.Name} key={i}>
                  {area.Name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            fullWidth
            component={NavLink}
            to="/dealer/register-shop/register/2"
            disabled={
              shop.name && shop.pincode && shop.address.locality ? false : true
            }
            sx={{
              backgroundColor: "#fff",
              my: "1rem",
              color: "dodgerblue",
            }}
          >
            Next
          </Button>
        </>
      )}
    </Stack>
  );
};

export default Name;
