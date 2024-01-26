import dealerApi from "..";

const dashboardEndpoints = {
  dealerInfo: "/dealer/info",
  recentOrders: (id) => `/dealer/dashboard/get-orders/${id}`,
  recentEarnings: (id) => `/dealer/dashboard/get-earnings/${id}`,
  orderNumbers: (id) => `/dealer/dashboard/get-orders-numbers/${id}`,
  earningsNumbers: (id) => `/dealer/dashboard/get-earnings-numbers/${id}`,
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
};
