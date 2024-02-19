import { dealerApi } from "../dealer-api";

const dashboardEndpoints = {
  dealerInfo: "/dealer/info",
  recentOrders: () => `/dealer/dashboard/get-orders`,
  recentEarnings: () => `/dealer/dashboard/get-earnings`,
  orderNumbers: () => `/dealer/dashboard/get-orders-numbers`,
  earningsNumbers: () => `/dealer/dashboard/get-earnings-numbers`,
  customersNumbers: () => `/dealer/dashboard/get-customers-number`,
  productsNumbers: () => `/dealer/dashboard/get-products-number`,
  getAllOrders: (page) => `/dealer/get-all-orders?page=${page}`,
  approveOrder: () => `/dealer/approve-order`,
};

export default {
  getDealerInfo: async () => {
    try {
      const response = await dealerApi.get(dashboardEndpoints.dealerInfo);
      return { response };
    } catch (err) {
      return { err };
    }
  },

  getRecentOrders: async () => {
    try {
      const response = await dealerApi.get(dashboardEndpoints.recentOrders());
      return { response };
    } catch (err) {
      return { err };
    }
  },

  getRecentEarnings: async () => {
    try {
      const response = await dealerApi.get(dashboardEndpoints.recentEarnings());
      return { response };
    } catch (err) {
      return { err };
    }
  },

  getOrdersNumbers: async () => {
    try {
      const response = await dealerApi.get(dashboardEndpoints.orderNumbers());
      return { response };
    } catch (err) {
      return { err };
    }
  },

  getEarningsNumbers: async () => {
    try {
      const response = await dealerApi.get(
        dashboardEndpoints.earningsNumbers()
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },

  getCustomersNumbers: async () => {
    try {
      const response = await dealerApi.get(
        dashboardEndpoints.customersNumbers()
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },

  getProductsNumbers: async () => {
    try {
      const response = await dealerApi.get(
        dashboardEndpoints.customersNumbers()
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },

  getAllOrders: async (page) => {
    try {
      const response = await dealerApi.get(
        dashboardEndpoints.getAllOrders(page)
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },

  approveOrder: async () => {
    try {
      const response = await dealerApi.put(dashboardEndpoints.approveOrder());
      return { response };
    } catch (err) {
      return { err };
    }
  },
};
