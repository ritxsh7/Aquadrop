import styled from "@emotion/styled";
import {
  Box,
  FormControl,
  Stack,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { useState } from "react";
import UploadProductImage from "./UploadProductImg";
import inventory from "../../api/modules/inventory";

const Input = styled(Box)({
  backgroundColor: "#fff",
});

const AddProduct = ({ SetProductForm }) => {
  //STATES AND STORES
  const [Product, SetProduct] = useState({
    name: "",
    img: null,
    description: "",
    price: "",
  });

  //HANDLERS
  const HandleAddProduct = async () => {
    const ProductData = new FormData();
    ProductData.append("name", Product.name);
    ProductData.append("product-img", Product.img);
    ProductData.append("description", Product.description);
    ProductData.append("price", Product.price);

    const { response, err } = await inventory.AddProduct(ProductData);
    if (response) {
      console.log(response);
    }
    if (err) {
      console.log(err);
    }
    SetProductForm(false);
  };

  return (
    <Box sx={{ width: "90vw", maxWidth: "850px", mb: "2rem" }}>
      <Typography variant="h3" mb="1rem" color="#4b4b4b">
        Product Details
      </Typography>
      <FormControl fullWidth>
        <Stack
          direction={{ md: "row" }}
          my="1rem"
          justifyContent="space-between"
          gap="1rem"
        >
          <Input width={{ xs: "100%", md: "45%" }}>
            <TextField
              label="Enter product name"
              fullWidth
              value={Product.name}
              onChange={(e) => SetProduct({ ...Product, name: e.target.value })}
            />
          </Input>
          <Input width={{ xs: "100%", md: "45%" }}>
            <TextField
              label="Enter product price"
              fullWidth
              value={Product.price}
              onChange={(e) =>
                SetProduct({ ...Product, price: e.target.value })
              }
            />
          </Input>
        </Stack>
        <Input>
          <TextField
            label="Put a description"
            multiline
            maxRows={5}
            value={Product.description}
            onChange={(e) =>
              SetProduct({ ...Product, description: e.target.value })
            }
            fullWidth
          />
        </Input>
        <UploadProductImage Product={Product} SetProduct={SetProduct} />
        <Button
          variant="contained"
          sx={{ height: "3rem", width: "100%", maxWidth: "550px", mx: "auto" }}
          onClick={HandleAddProduct}
        >
          Save Product
        </Button>
      </FormControl>
    </Box>
  );
};

export default AddProduct;
