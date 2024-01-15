import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const existingemail = await User.findOne({ email: req.body.email });
  try {
    if (existingemail) return next(createError(409, "Email already exists"));
    else {
      const salt = bcrypt.genSaltSync(10);
      const hashedpassword = bcrypt.hashSync(req.body.password, salt);
      const user = new User({ ...req.body, password: hashedpassword });
      await user.save();
      res.status(201).json("User has been Created");
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};
export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.email });
    if (!user) return next(createError(404, "User not found"));

    const isMatched = bcrypt.compareSync(req.body.password, user.password);
    if (!isMatched) return next(createError(400, "wrong credentials"));

    const accessToken = jwt.sign({ id: user._id }, process.env.SECRET);
    const { password, ...others } = user._doc;

    res.status(200).json({ others, accessToken });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const accessToken = jwt.sign({ id: user._id }, process.env.SECRET);
      const { password, ...others } = user._doc;

      res.status(200).json({ others, accessToken });
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      const accessToken = jwt.sign({ id: savedUser._id }, process.env.SECRET);

      const { password, ...others } = user._doc;

      res.status(200).json({ others, accessToken });
    }
  } catch (err) {
    next(err);
  }
};
