import Order from "../model/Order.js";

// =============================GET THE NO OF ORDERS BY THIS MONTH========================

export const getThisMonthsOrders = async (req, res) => {
  try {
    const { id } = req.params;
    const allOrders = await Order.find({ "items.shopId": id }).lean().exec();
    const orderFilters = allOrders.map((order) => {
      return {
        timePlaced: order.timePlaced,
        quantity: order.items.length,
      };
    });
    return res.status(200).json({
      orderFilters,
    });
  } catch (err) {
    return res.json({ error: err.message });
  }
};

export const getThisMonthsEarnings = async (req, res) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const { id } = req.params;

  const firstDate = new Date(year, month, 1);
  const lastDate = new Date(year, month + 1, 0);

  const dateReducer = (orders) => {
    const filteredOrders = orders.reduce((result, item) => {
      const eachDate = new Date(item.timePlaced);
      const formattedDate = eachDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      const key = formattedDate;

      if (!result[key]) {
        result[key] = 0;
      }

      let sum = 0;

      for (let i = 0; i < item.items.length; i++) {
        sum = sum + item.items[i].price * item.items[i].quantity;
      }
      result[key] = result[key] + sum;
      return result;
    }, {});
    return filteredOrders;
  };

  try {
    let result = await Order.find({
      "items.shopId": id,
      timePlaced: { $gte: firstDate, $lte: lastDate },
    });

    result = dateReducer(result);
    result = Object.entries(result).map(([date, value]) => ({
      date,
      value,
    }));

    return res.status(200).json({
      result,
    });
  } catch (err) {
    return res.json({ message: "Can't get earnings" + err.message });
  }
};
