import { dealerApi } from "../dealer-api";

const InventoryEndpoints = {
  AddProduct: "/dealer/inventory/add-products",
  GetAllProducts: "/dealer/inventory/get-all-products",
  DeleteSelectedProducts: "/dealer/inventory/delete-selected-products",
  SearchQuery: (text) => `/dealer/inventory/search-product?searchtext=${text}`,
};

export default {
  AddProduct: async (product) => {
    try {
      const response = await dealerApi.post(
        InventoryEndpoints.AddProduct,
        product
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  GetAllProducts: async () => {
    try {
      const response = await dealerApi.get(InventoryEndpoints.GetAllProducts);
      return { response };
    } catch (err) {
      return { err };
    }
  },
  DeleteSelectedProducts: async (SelectedItems) => {
    try {
      const response = await dealerApi.delete(
        InventoryEndpoints.DeleteSelectedProducts,
        { data: SelectedItems }
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  SearchQuery: async (text) => {
    try {
      const response = await dealerApi.get(
        InventoryEndpoints.SearchQuery(text)
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
};
