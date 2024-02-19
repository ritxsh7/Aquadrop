import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleLoading } from "../../redux/features/dealer";

//components
import { Box, Button, Typography, Alert } from "@mui/material";
import ImageUpload from "../../assets/upload-image.png";
import { DealerApi } from "../../api/modules/dealer";

const UploadImage = () => {
  //STATES AND STORES

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [success, SetSuccess] = useState(false);
  const [SuccessMsg, SetSuccessMsg] = useState("");
  const [error, SetError] = useState(false);
  const [ErrMsg, SetErrMsg] = useState("");
  const [file, SetFile] = useState(null);

  const HandleFile = (e) => {
    SetFile(e.target.files[0]);
  };

  const UploadShopImage = async () => {
    dispatch(toggleLoading(true));
    const ShopImage = new FormData();
    ShopImage.append("img", file);
    const { response, err } = await DealerApi.UploadImage(ShopImage);
    if (response) {
      console.log(response);
      SetError(false);
      SetSuccess(true);
      SetSuccessMsg(response.message);
      navigate("/");
    }
    if (err) {
      SetSuccess(false);
      SetError(true);
      SetErrMsg(err.message);
    }
    dispatch(toggleLoading(true));
  };

  return (
    <Box>
      <Box sx={{ my: "2rem" }}>
        <Typography variant="h2" color="white">
          You're almost done.
        </Typography>
        <Typography variant="p" color="white">
          Add images of your shop for customers to view them
        </Typography>
      </Box>

      <Box
        component="label"
        htmlFor="images"
        className="drop-container"
        id="dropcontainer"
      >
        <Box component="img" class="upload-img" src={ImageUpload}></Box>
        <span className="drop-title">Drop files here</span>
        <Box
          component="input"
          type="file"
          id="images"
          accept="image/*"
          required
          onChange={HandleFile}
          sx={{ width: "5.6rem" }}
        ></Box>
      </Box>
      <Button
        variant="contained"
        fullWidth
        sx={{
          p: "0.5rem 1rem",
          color: "dodgerblue",
          backgroundColor: "white",
          m: "1rem auto",
          ":hover": {
            backgroundColor: "#f0f0f0",
          },
        }}
        onClick={UploadShopImage}
      >
        Complete Registration
      </Button>
      {error && <Alert severity="error">{ErrMsg}</Alert>}
      {success && <Alert severity="success">{SuccessMsg}</Alert>}
    </Box>
  );
};

export default UploadImage;
