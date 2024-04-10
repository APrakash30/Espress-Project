import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    console.log(req.body);
    const { email, name, bio, image } = req.body;
    const userPassword = req.body.password;

    const isUser = await userModel.findOne({ email });

    if (isUser) {
      res.status(403).json({
        data: null,
        message: " email already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userPassword, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      bio,
      image,
    });

    const saveUser = await newUser.save();

    const { password, ...otherDetails } = saveUser._doc;
    res.status(201).json({
      data: otherDetails,
      message: "User Successfully registered",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email } = req.body;
    const userPassword = req.body.password;

    const isUser = await userModel.findOne({ email });

    if (!isUser) {
      return res.status(404).json({
        data: null,
        message: "User Not found",
      });
    }

    const isPassword = await bcrypt.compare(userPassword, isUser.password);

    if (!isPassword) {
      return res.status(403).json({
        data: null,
        message: "Password doesnot mached",
      });
    }

    const { password, ...otherDetails } = isUser._doc;

    res.status(200).json({
      data: otherDetails,
      message: "User successfully loggedIn",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    // Using params
    //   const { id } = req.params;
    //   const user = await userModel.findById(id);
    //   if (!user) {
    //     return res.status(404).json({
    //       data: null,
    //       message: "User details does not exist",
    //     });
    //   }
    //   const { password, ...otherDetails } = user._doc;
    //   res.status(200).json({
    //     data: otherDetails,
    //     message: "User data fetched successfull",
    //   });

    //Using query params

    const { id } = req.query;
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({
        data: null,
        message: "User not found",
      });
    }

    const { password, ...otherDetails } = user._doc;
    res.status(200).json({
      data: otherDetails,
      message: "User Data Fetched successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const isUser = await userModel.findById(id);

    if (!isUser) {
      return res.status(404).json({
        data: null,
        message: "User not found",
      });
    }

    const updateUser = await userModel.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    const { password, ...otherDetails } = updateUser._doc;
    res.status(200).json({
      data: otherDetails,
      message: "Updated Details successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const isUser = await userModel.findById(id);

    if (!isUser) {
      return res.status(404).json({
        data: null,
        message: "User not found",
      });
    }

    await userModel.findByIdAndDelete(id);

    res.status(200).json({
      data: null,
      message: "User deleted successfull",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
