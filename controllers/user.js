import { createError } from "../error.js"
import User from "../models/User.js";
import Video from "../models/Video.js";

/* const {createError} = require("../error.js");
const User = require("../models/User.js");
const Video = require("../models/Video.js"); */

export const update = async (req,res,next)=>{
    if(req.params.id === req.user.id){
      try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
          $set: req.body,
        },{new: true});
        res.status(200).json(updatedUser);
      }catch(err){
        next(err);
      }
    }else{
        return next(createError(403, "Unauthorized"))
    }
}
export const getUser = async (req,res,next)=>{
   try{
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
   }catch(err){
    next(err);
   }
}
export const getAllUsers = async (req,res,next)=>{
   try{
      const user = await User.find();
      res.status(200).json(user);
   }catch(err){
    next(err);
   }
}
export const deleteUser = async (req,res,next)=>{
    if(req.params.id === req.user.id){
        try{
          await User.findByIdAndDelete(req.params.id,
         );
          res.status(200).json("user has been deleted");
        }catch(err){
          next(err);
        }
      }else{
          return next(createError(403, "Unauthorized Operation"))
      }
}
export const subscribe = async (req,res,next)=>{
    try{
        await User.findById(req.user.id, {
            $push: {subscribedUsers: req.params.id}
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: {subscribers: 1}
        })
        res.status(200).json("subscription succesful");
     }catch(err){
      next(err);
     }
}
export const unsubscribe = async (req,res,next)=>{
    try{
        await User.findById(req.user.id, {
            $pull: {subscribedUsers: req.params.id}
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: {subscribers: -1}
        })
        res.status(200).json("unsubscription succesful");
     }catch(err){
      next(err);
     }
}
export const like = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId,{
      $addToSet:{likes:id},
      $pull:{dislikes:id}
    })
    res.status(200).json("The video has been liked.")
  } catch (err) {
    next(err);
  }
};
export const dislike = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId,{
      $addToSet:{dislikes:id},
      $pull:{likes:id}
    })
    res.status(200).json("The video has been disliked.")
} catch (err) {
  next(err);
}
};