import Order from "../model/Order.js";
import Shop from "../model/Shop.js";

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth();
const firstDate = new Date(year, month, 1);
const lastDate = new Date(year, month + 1, 0);

const getAllorders = async (id) => {
  const orders = await Order.find({ "items.shopId": id });
  return orders;
};

const getEarnings = async (allOrders) => {
  const items = allOrders.map((order) => order.items);
  let sum = 0;
  const itemsMap = items.map((item) => {
    item.map((i) => {
      sum = sum + i.price * i.quantity;
    });
  });
  return sum;
};

const getThisMonthsOrders = async (id) => {
  const allOrders = await Order.find({
    "items.shopId": id,
    timePlaced: { $gte: firstDate, $lte: lastDate },
  })
    .lean()
    .exec();
  return allOrders;
};

export const getThisMonthsOrdersNumber = async (req, res) => {
  try {
    const { id } = req.params;
    const aggregate = await getAllorders(id);
    const allOrders = await getThisMonthsOrders(id);
    const number = allOrders.length;

    return res.status(200).json({
      number,
      aggregate: aggregate.length,
    });
  } catch (err) {
    return res.json({ error: "Cant get orders" + err.message });
  }
};

export const getThisMonthsEarningsNumber = async (req, res) => {
  try {
    const { id } = req.params;

    const allOrders = await getThisMonthsOrders(id);
    const sum = await getEarnings(allOrders);
    const orders = await getAllorders(id);
    const aggregate = await getEarnings(orders);

    return res.json({ number: sum, aggregate });
  } catch (err) {
    return res.json({ error: "Cant get orders " + err.message });
  }
};

export const getThisMonthsCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await getThisMonthsOrders(id);
    const newUsers = new Set(orders.map((item) => String(item.userId)));
    const allOrders = await getAllorders(id);
    const allUsers = new Set(allOrders.map((item) => String(item.userId)));
    res.status(200).json({
      number: newUsers.size,
      aggregate: allUsers.size,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error while getting customers data " + err.message,
    });
  }
};

export const getProducts = async (req, res) => {
  const { products } = await Shop.find({ _id: id });
  console.log(products);
};
