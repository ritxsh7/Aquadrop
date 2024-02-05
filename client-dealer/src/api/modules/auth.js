import { generalApi } from "../general-api";

const authEndpoints = {
  login: "/dealer/login",
  signup: "/dealer/signup",
};

export const authApi = {
  login: async (details) => {
    try {
      const response = await generalApi.post(authEndpoints.login, details);
      return { response };
    } catch (err) {
      return { err };
    }
  },
};
