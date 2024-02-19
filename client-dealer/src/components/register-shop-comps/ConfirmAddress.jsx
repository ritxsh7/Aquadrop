import {
  Box,
  FormControl,
  Select,
  Button,
  MenuItem,
  Typography,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { DealerApi } from "../../api/modules/dealer";
import { useDispatch } from "react-redux";
import { toggleLoading } from "../../redux/features/dealer";

const ConfirmAddress = ({ shop, setShop }) => {
  const [areas, SetAreas] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(shop);
  useEffect(() => {
    if (!shop.address.line1) navigate("/dealer/register-shop/register/1");
  }, [shop]);

  useEffect(() => {
    const GetLocations = async () => {
      dispatch(toggleLoading(true));
      const { response, err } = await DealerApi.GetAWSLocations(
        shop.address,
        shop.pincode
      );
      if (response) {
        SetAreas(response.NearbyLocations);
      }
      if (err) console.log(err);
      dispatch(toggleLoading(false));
    };
    GetLocations();
  }, [shop]);

  const HandleChangeLocation = async (e) => {
    const location = await areas.filter(
      (area) => area.Label === e.target.value
    );
    console.log(location[0].Geometry.Point);
    setShop({
      ...shop,
      area: e.target.value,
      coordinates: location[0].Geometry.Point,
    });
  };

  return (
    <Box sx={{ width: "90%", my: "2rem" }}>
      <Typography
        color="white"
        textAlign="center"
        fontSize={{ xs: "small", md: "normal" }}
      >
        Based on your input we identified following locations, Please choose and
        confirm.
      </Typography>
      <Box
        sx={{
          backgroundColor: "white",
          margin: "auto",
          maxWidth: "550px",
          my: "1rem",
        }}
      >
        <FormControl fullWidth>
          <Select
            value={shop.area}
            sx={{
              color: "#4b4b4b",
              fontSize: { xs: "small", md: "normal" },
              width: "100%",
              "& .MuiSelect-root": {
                border: "1px solid white",
              },
              "& .MuiSelect-outlined": {
                border: "2px solid white", // Border color
              },
            }}
            onChange={HandleChangeLocation}
          >
            {areas?.map((area, i) => (
              <MenuItem
                value={area.Label}
                key={i}
                sx={{
                  textWrap: "balance",
                  width: "100%",
                  fontSize: { xs: "small", md: "normal" },
                  height: "auto",
                }}
              >
                {area.Label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Stack width="100%" maxWidth="550px" mx="auto">
        <Box
          display={shop.area === "" ? "none" : "block"}
          variant="outlined"
          sx={{
            textDecoration: "none",
            p: "0.6rem 1rem",
            backgroundColor: "white",
            m: "1rem auto",
            ":hover": {
              backgroundColor: "#f0f0f0",
            },
            width: "100%",
            color: "dodgerblue",
            borderRadius: "0.2rem",
          }}
          component={NavLink}
          to="/dealer/register-shop/register/4"
        >
          Next
        </Box>
        <Button
          fullWidth
          variant="contained"
          sx={{
            p: "0.5rem 1rem",
            backgroundColor: "black",
            ":hover": {
              backgroundColor: "#4b4b4b",
            },
            m: "0 auto 1rem auto",
          }}
        >
          Go Back
        </Button>
      </Stack>
    </Box>
  );
};

export default ConfirmAddress;
