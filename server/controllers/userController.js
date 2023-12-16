import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//==============================SIGNUP==================================

export const userSignUp = async (request, respose) => {
  try {
    //extract data from request
    const { name, email, password, role, pincode } = request.body;

    //check if useralready exists
    const checkUser = await User.findOne({ email: email, role: role });
    if (checkUser) {
      return respose.status(400).json({
        message: "User already exists!",
      });
    }

    //hash password using bcrypt
    try {
      var hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      respose.status(400).json({
        success: false,
        error: err.message,
      });
    }

    //create new user
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
      role: role,
      pincode: pincode,
    });
    await newUser.save();

    respose.status(200).json({
      success: true,
      data: { name, email },
      message: "successful signup",
    });
  } catch (error) {
    console.log(error);
    respose.status(400).json({
      message: "Something went wrong!!",
    });
  }
};

//==============================LOGIN==================================
export const userLogin = async (req, res) => {
  try {
    const user = req.body;

    //find the user using email
    const checkUser = await User.findOne({ email: user.email });

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
        email: checkUser.email,
        role: checkUser.role,
      };

      //create a jwt token
      const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      //return cookies for response

      //options for cookie
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      console.log(jwtToken);
      return res
        .cookie("token", jwtToken, options)
        .status(200)
        .json({
          data: {
            name: checkUser.name,
            email: checkUser.email,
            role: checkUser.role,
            token: jwtToken,
          },

          message: "Login successful",
        });
    } else {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }
  } catch (err) {
    //catch errors
    res.send("Error while logging in" + err.message);
  }
};

const saveUserLocation = async (req, res) => {
  const { location } = req.body;
};
