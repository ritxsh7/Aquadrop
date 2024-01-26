import orders from "../../assets/orders.png";
import earnings from "../../assets/earnings.png";
import customers from "../../assets/costumers.png";
import products from "../../assets/products.png";
import dashboard from "../../api/modules/dashboard";

export default [
  {
    display: "Orders",
    icon: orders,
    getInfo: async (id) => await dashboard.getOrdersNumbers(id),
  },
  {
    display: "Earning (₹)",
    icon: earnings,
    getInfo: async (id) => await dashboard.getEarningsNumbers(id),
  },
  {
    display: "Products",
    icon: products,
    getInfo: () => {},
  },
  {
    display: "Customers",
    icon: customers,
    getInfo: () => {},
  },
];
