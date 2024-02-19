import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleLoading } from "../../redux/features/dealer";

//components & styles
import {
  Box,
  Stack,
  Typography,
  Button,
  FormLabel,
  Alert,
} from "@mui/material";
import { RegisterShopStyles } from "../../utils/styles";
import { styled } from "@mui/system";

//APIS
import { DealerApi } from "../../api/modules/dealer";

const Summary = ({ shop, setShop }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [success, SetSuccess] = useState(false);
  const [SuccessMsg, SetSuccessMsg] = useState("");
  const [error, SetError] = useState(false);
  const [ErrMsg, SetErrMsg] = useState("");

  const RegisterShop = async () => {
    dispatch(toggleLoading(true));

    const { response, err } = await DealerApi.RegisterShop(shop);
    if (response) {
      SetSuccess(true);
      SetError(false);
      SetSuccessMsg(response.message);
      setTimeout(() => {
        navigate("/dealer/register-shop/register/5");
      }, 2000);
    }
    if (err) {
      SetError(true);
      SetSuccess(false);
      SetErrMsg(err.message);
    }
    dispatch(toggleLoading(false));
  };

  useEffect(() => {
    if (!shop.address.line1 && !shop.address.line2 && !shop.locality)
      navigate("/dealer/register-shop/register/1");
  }, [shop]);

  const SummaryLabel = styled(FormLabel)(({ theme }) => ({
    color: "white",
    textAlign: "left",
    fontSize: "1rem",
    [theme.breakpoints.up("md")]: {
      fontSize: "1rem",
    },
  }));

  const Fields = styled(Typography)(({ theme }) => ({
    color: "#4b4b4b",
    padding: "1rem",
    borderRadius: "0.2rem",
    textAlign: "left",
    backgroundColor: "#EBF4FF",
    fontSize: "1rem",
    [theme.breakpoints.up("md")]: {
      fontSize: "1rem",
    },
  }));

  return (
    <Box sx={RegisterShopStyles.Summary}>
      <Box class="header" sx={{ mb: "1rem" }}>
        <Typography variant="h5" color="white">
          Registration Summary
        </Typography>
      </Box>
      <Stack gap={{ xs: "1rem", md: "2rem" }} my="1.6rem">
        <Box sx={RegisterShopStyles.SummaryFields}>
          <SummaryLabel>Shop Name :</SummaryLabel>
          <Fields>{shop.name}</Fields>
        </Box>
        <Box sx={RegisterShopStyles.SummaryFields}>
          <SummaryLabel>Street :</SummaryLabel>
          <Fields>
            {shop.address.line1}, {shop.address.line2},
          </Fields>
        </Box>
        <Box sx={RegisterShopStyles.SummaryFields}>
          <SummaryLabel>Area :</SummaryLabel>
          <Fields>{shop.area}</Fields>
        </Box>
        <Box sx={RegisterShopStyles.SummaryFields}>
          <SummaryLabel>Pincode :</SummaryLabel>
          <Fields>{shop.pincode}</Fields>
        </Box>
      </Stack>

      <Stack width="100%">
        <Button
          fullWidth
          variant="outlined"
          sx={{
            p: "0.5rem 1rem",
            backgroundColor: "white",
            m: "1rem auto",
            ":hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
          onClick={RegisterShop}
        >
          Confirm Registration
        </Button>
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
      {error && <Alert severity="error">{ErrMsg}</Alert>}
      {success && <Alert severity="success">{SuccessMsg}</Alert>}
    </Box>
  );
};

export default Summary;
