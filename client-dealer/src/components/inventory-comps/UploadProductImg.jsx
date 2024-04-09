import React from "react";

//components
import { Box } from "@mui/material";
import ImageUpload from "../../assets/upload-image.png";

const UploadProductImg = ({ Product, SetProduct }) => {
  //STATES AND STORE

  const HandleFile = (e) => {
    SetProduct({ ...Product, img: e.target.files[0] });
  };

  return (
    <Box>
      <Box
        component="label"
        htmlFor="images"
        className="drop-container"
        id="dropcontainer"
        sx={{ my: { md: "4rem" } }}
      >
        <Box component="img" className="upload-img" src={ImageUpload}></Box>
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
    </Box>
  );
};

export default UploadProductImg;
