import { stores } from "./constants/data.js";
import Store from "./model/product-schema.js";

const defaultData = async () => {
  try {
    await Store.insertMany(stores);
    console.log("Data imported sucessfully");
  } catch (error) {
    console.log("error while inserting default data ", error.message);
  }
};

export default defaultData;
