import axios from "axios";
import queryString from "query-string";

const baseURL = "http://localhost:8080/api/v1";

export const dealerApi = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});

dealerApi.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("aqua-dealer-tkn")}`,
    },
  };
});

dealerApi.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    throw err.response.data;
  }
);

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
