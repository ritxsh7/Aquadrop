import Order from "../model/Order.js";

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth();
const firstDate = new Date(year, month, 1);
const lastDate = new Date(year, month + 1, 0);

export const getThisMonthsOrdersNumber = async (req, res) => {
  try {
    const { id } = req.params;
    const allOrders = await Order.find({
      "items.shopId": id,
      timePlaced: { $gte: firstDate, $lte: lastDate },
    })
      .lean()
      .exec();
    const number = allOrders.length;
    return res.status(200).json({
      number,
    });
  } catch (err) {
    return res.json({ error: "Cant get orders" + err.message });
  }
};

export const getThisMonthsEarningsNumber = async (req, res) => {
  try {
    const { id } = req.params;
    const allOrders = await Order.find({
      "items.shopId": id,
      timePlaced: { $gte: firstDate, $lte: lastDate },
    })
      .lean()
      .exec();
    const items = allOrders.map((order) => order.items);
    let sum = 0;
    const itemsMap = items.map((item) => {
      item.map((i) => {
        sum = sum + i.price * i.quantity;
      });
    });
    return res.json({ number: sum });
  } catch (err) {
    return res.json({ error: "Cant get orders" + err.message });
  }
};
