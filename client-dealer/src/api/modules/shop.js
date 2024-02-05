import { publicApi } from "../public-api";

const shopEndpoints = {
  getPincode: (id) => `https://api.postalpincode.in/pincode/${id}`,
};

export const dealerShop = {
  getPincode: async (id) => {
    try {
      const response = await publicApi.get(shopEndpoints.getPincode(id));
      console.log(response);
      if (response[0].Status === "404") throw response[0].Message;
      if (response[0].Status === "Success") return { response };
    } catch (err) {
      return { err };
    }
  },
};
