import { dealerApi } from "../dealer-api";

const dashboardEndpoints = {
  dealerInfo: "/dealer/info",
  recentOrders: (id) => `/dealer/dashboard/get-orders/${id}`,
  recentEarnings: (id) => `/dealer/dashboard/get-earnings/${id}`,
  orderNumbers: (id) => `/dealer/dashboard/get-orders-numbers/${id}`,
  earningsNumbers: (id) => `/dealer/dashboard/get-earnings-numbers/${id}`,
  customersNumbers: (id) => `/dealer/dashboard/get-customers-number/${id}`,
  productsNumbers: (id) => `/dealer/dashboard/get-products-number/${id}`,
  getAllOrders: (id, page) => `/dealer/get-all-orders/${id}?page=${page}`,
  approveOrder: (id) => `/dealer/approve-order/${id}`,
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

  getRecentOrders: async (id) => {
    try {
      const response = await dealerApi.get(dashboardEndpoints.recentOrders(id));
      return { response };
    } catch (err) {
      return { err };
    }
  },

  getRecentEarnings: async (id) => {
    try {
      const response = await dealerApi.get(
        dashboardEndpoints.recentEarnings(id)
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },

  getOrdersNumbers: async (id) => {
    try {
      const response = await dealerApi.get(dashboardEndpoints.orderNumbers(id));
      return { response };
    } catch (err) {
      return { err };
    }
  },

  getEarningsNumbers: async (id) => {
    try {
      const response = await dealerApi.get(
        dashboardEndpoints.earningsNumbers(id)
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },

  getCustomersNumbers: async (id) => {
    try {
      const response = await dealerApi.get(
        dashboardEndpoints.customersNumbers(id)
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },

  getProductsNumbers: async (id) => {
    try {
      const response = await dealerApi.get(
        dashboardEndpoints.customersNumbers(id)
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },

  getAllOrders: async (id, page) => {
    try {
      const response = await dealerApi.get(
        dashboardEndpoints.getAllOrders(id, page)
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },

  approveOrder: async (id) => {
    try {
      const response = await dealerApi.put(dashboardEndpoints.approveOrder(id));
      return { response };
    } catch (err) {
      return { err };
    }
  },
};
