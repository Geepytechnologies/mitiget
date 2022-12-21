import mongoose from "mongoose"
import User from "../models/User.js"
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

/* const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const {createError} = require("../error.js");
const jwt = require("jsonwebtoken"); */

export const signup = async (req,res,next)=>{
  const existingusername = await User.findOne({username: req.body.username})
  const existingemail = await User.findOne({email: req.body.email})
  const existinguser = await User.findOne({email: req.body.email, username: req.body.username})
  try{
    if(existinguser) return next(createError(409, "User already exists"))
    else if(existingemail) return next(createError(409, "Email already exists"))
    else if(existingusername) return next(createError(409, "Username is unavailable"))
    else{
    const salt = bcrypt.genSaltSync(10);
    const hashedpassword = bcrypt.hashSync(req.body.password, salt);
    const user = new User({...req.body, password: hashedpassword});
    await user.save();
    res.status(201).json("User has been Created");
    }
  }catch(err){
    next(err);
  }
}
export const signin = async (req,res,next)=>{
  try{
    const user = await User.findOne({username: req.body.username})
    if(!user) return next(createError(404, "User not found"));


    const isMatched = bcrypt.compareSync(req.body.password, user.password);
    if(!isMatched) return next(createError(400,"wrong credentials"));

    const token = jwt.sign({id: user._id}, process.env.SECRET)
    const {password, ...others} = user._doc;

    res.cookie('_token', token, {
        httpOnly: true,
        expiresin: 60 * 60
    })
    res.status(200).json({others, token});
  }catch(err){
    next(err);
  }
}

export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(user._doc);
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(savedUser._doc);
    }
  } catch (err) {
    next(err);
  }
};