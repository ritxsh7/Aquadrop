import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//====================================SIGNIN IN DEALER================================================
export const signUpDealer = async (req, res) => {
  try {
    const { name, email, gstID, phone, password } = req.body;

    // ================CHECK VALIDATION============================
    if (
      name === "" ||
      password === "" ||
      email === "" ||
      gstID === "" ||
      phone === ""
    )
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    const checkDealer = await User.findOne({ phone: phone });

    if (checkDealer)
      return res
        .status(400)
        .json({ success: false, message: "Dealer already exists" });

    // ========================HASHING=================
    try {
      var hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      respose.status(400).json({
        success: false,
        error: err.message,
      });
    }

    //===================SAVE THE USER=====================
    const newDealer = new User({
      email,
      gstID,
      phone,
      password: hashedPassword,
      name,
      role: "Dealer",
    });

    const dealer = await newDealer.save();

    return res.status(200).json({
      success: true,
      dealer,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: "Something went wrong while signing in" + err.message,
    });
  }
};

//========================================LOGIN DEALER=================================================
export const loginDealer = async (req, res) => {
  try {
    const user = req.body;

    //find the user using phone
    const checkUser = await User.findOne({ phone: user.phone });

    //if user deosnt exists then show msg
    if (!checkUser) {
      return res.status(300).json({
        message: "User doesnt exist !",
      });
    }

    //compare passwords
    if (await bcrypt.compare(user.password, checkUser.password)) {
      //if passwords match
      const payload = {
        id: checkUser._id,
        name: checkUser.name,
        gstID: checkUser.gstID,
        phone: checkUser.phone,
        role: checkUser.role,
      };

      //create a jwt token
      const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      return res.status(200).json({
        data: {
          name: checkUser.name,
          phone: checkUser.phone,
          role: checkUser.role,
          tokenExpire: Date.now() + 30 * 24 * 60 * 60 * 1000,
        },
        token: jwtToken,
        message: "Login successful",
      });
    } else {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }
  } catch (err) {
    res.status(400).json({ message: "Error while logging in" + err.message });
    console.log(err.message);
  }
};

// ======================================GET DEALER INFO==========================================
export const getDealerInfo = async (req, res) => {
  try {
    const { user } = req.body;
    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).send("Invalid user");
  }
};

export const saveShop = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, img, address, pincode } = req.body;
    console.log(name, img, address, pincode, id);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
