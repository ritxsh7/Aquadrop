import { dealerApi } from "../dealer-api";

const DealerEndpoints = {
  GetAWSLocations: "/dealer/get-aws-location",
  RegisterShop: `/dealer/register-shop/`,
  UploadImage: "dealer/shop/upload-img",
};

export const DealerApi = {
  GetAWSLocations: async (address, pincode) => {
    try {
      const response = await dealerApi.post(DealerEndpoints.GetAWSLocations, {
        address,
        pincode,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },

  RegisterShop: async (shop) => {
    try {
      const response = await dealerApi.post(DealerEndpoints.RegisterShop, shop);
      return { response };
    } catch (err) {
      return { err };
    }
  },

  UploadImage: async (img) => {
    try {
      const response = await dealerApi.post(DealerEndpoints.UploadImage, img);
      return { response };
    } catch (err) {
      return { err };
    }
  },
};
