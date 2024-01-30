import { publicApi } from "..";

const shopEndpoints = {
  getPincode: (id) => `https://api.postalpincode.in/pincode/${id}`,
};

export const dealerShop = {
  getPincode: async (id) => {
    try {
      const response = await publicApi.get(shopEndpoints.getPincode(id));
      return { response };
    } catch (err) {
      return { err };
    }
  },
};
