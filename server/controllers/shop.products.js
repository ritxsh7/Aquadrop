import { UploadToCloudinary } from "../middlewares/file-handling.js";
import Product from "../model/Product.js";
import Shop from "../model/Shop.js";

// ========================ADD PRODUCT TO THE LIST=============================
export const AddProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const { user } = req;
    const { result, err } = await UploadToCloudinary(req.file.path);
    if (result) {
      const NewProduct = new Product({
        name,
        price,
        image: result.secure_url,
        description,
      });
      const SavedProduct = await NewProduct.save();
      console.log(SavedProduct);

      const NewProductList = await Shop.findOneAndUpdate(
        { _id: user.shop },
        {
          $push: { products: SavedProduct._id },
        },
        { new: true }
      );
      console.log(NewProductList);
      return res.status(200).send("Success");
    }
    if (err) throw err;
  } catch (err) {
    console.log(err);
    return res.status(400).send("Failed");
  }
};

//========================FETCH THE PRODUCT LIST===============================
export const GetAllProducts = async (req, res) => {
  try {
    const { user } = req;
    const AllProducts = await Shop.findOne({
      _id: user.shop,
    })
      .populate("products")
      .exec();
    return res.status(200).json({
      products: AllProducts.products,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send("Can't fetch the products");
  }
};

export const DeleteSelectedProducts = async (req, res) => {
  try {
    const { user } = req;
    const ids = req.body;
    let SelectedIds = [];
    for (let id in ids) {
      SelectedIds.push(id);
    }
    const NewList = await Shop.findOneAndUpdate(
      { _id: user.shop },
      {
        $pull: { products: { $in: SelectedIds } },
      },
      { new: true }
    );
    console.log(NewList);
    return res.status(200).send("Deleted Products successfully");
  } catch (err) {
    console.log(err);
    return res.status(400).send("Failed to delete the products");
  }
};

export const SearchQuery = async (req, res) => {
  const SearchTerm = req.query.searchtext;
  if (!SearchTerm) return res.send([]);
  try {
    const searchResults = await Product.find({
      name: { $regex: SearchTerm, $options: "i" },
    }).limit(10);
    res.status(200).json(searchResults);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
