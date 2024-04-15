import { useEffect, useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  Button,
  TextField,
  ListItem,
  ListItemButton,
  Box,
  Stack,
  styled,
  Typography,
  List,
} from "@mui/material";
import { InventoryStyles } from "../utils/styles";
import AddProduct from "../components/inventory-comps/AddProduct";
import ItemsTable from "../components/inventory-comps/ItemsTable";
import ProtectedPage from "../components/general-comps/ProtectedPage";
import inventoryApi from "../api/modules/inventory";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoading } from "../redux/features/dealer";

const Inventory = () => {
  //  STATES AND STORES
  const inventory = useSelector((store) => store.inventory);
  const dispatch = useDispatch();
  const [ProductForm, SetProductForm] = useState(false);
  const [ShowBox, SetShowBox] = useState(false);
  const [SearchResults, SetSearchResults] = useState([]);
  const [products, setProducts] = useState([]);

  const handleDeleteSelectedRows = async () => {
    dispatch(toggleLoading(true));
    const SelectedItems = inventory.SelectedItems;

    const { response, err } = await inventoryApi.DeleteSelectedProducts(
      SelectedItems
    );
    if (response) console.log(response);
    if (err) console.log(err);
    dispatch(toggleLoading(false));
  };

  const HandleSearch = async (e) => {
    const { response, err } = await inventoryApi.SearchQuery(e.target.value);
    if (response) {
      SetSearchResults(response);
      console.log(response);
    }
    if (err) console.log(err);
  };

  useEffect(() => {
    const GetAllProducts = async () => {
      dispatch(toggleLoading(true));
      const { response, err } = await inventoryApi.GetAllProducts();
      if (response) {
        console.log(response);
        setProducts(response.products);
      }
      if (err) {
        console.log(err);
      }
      dispatch(toggleLoading(false));
    };

    GetAllProducts();
  }, []);

  useEffect(() => {
    const HandleOutsideClick = (e) => {
      if (
        !e.target.closest(".search-results") &&
        !e.target.closest(".search-box")
      )
        SetShowBox(false);
    };
    document.addEventListener("click", HandleOutsideClick);
    return () => {
      document.removeEventListener("click", HandleOutsideClick);
    };
  }, [SetShowBox]);

  return (
    <>
      <Box sx={{ backgroundColor: "#DFEEFF", minHeight: "93vh" }}>
        <Stack sx={InventoryStyles.Table}>
          <Stack direction={{ md: "row" }} sx={InventoryStyles.Toolkit}>
            <Box
              sx={{
                flexDirection: "column",
                width: "100%",
                maxWidth: "400px",
                gap: "1rem",
              }}
            >
              <Box sx={{ backgroundColor: "#fff" }} className="search-box">
                <TextField
                  sx={InventoryStyles.SearchBar}
                  label="Search Products"
                  onFocus={() => SetShowBox(true)}
                  onChange={HandleSearch}
                />
              </Box>
              {ShowBox && (
                <List
                  sx={InventoryStyles.RecommendBox}
                  className="search-results"
                >
                  {SearchResults.length === 0 ? (
                    <ListItem>No Products Found </ListItem>
                  ) : (
                    SearchResults.map((item) => (
                      <ListItemButton>{item.name}</ListItemButton>
                    ))
                  )}
                </List>
              )}
            </Box>
            <Stack direction="row" gap="1rem">
              <Button
                variant="contained"
                color="primary"
                sx={InventoryStyles.Button}
                onClick={() => {
                  SetProductForm(true);
                }}
              >
                New Product
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteSelectedRows}
                sx={InventoryStyles.Button}
              >
                Delete
              </Button>
            </Stack>
          </Stack>
          {ProductForm && <AddProduct SetProductForm={SetProductForm} />}
          <ItemsTable products={products} />
        </Stack>
      </Box>
    </>
  );
};

export default Inventory;
