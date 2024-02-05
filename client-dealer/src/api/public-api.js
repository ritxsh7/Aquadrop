import axios from "axios";
import queryString from "query-string";

export const publicApi = axios.create({
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});

publicApi.interceptors.request.use(async (config) => {
  return {
    ...config,
  };
});

publicApi.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    throw err.response.data;
  }
);
