import { createError } from "../error.js";
import Comment from "../models/Comments.js";
import Video from "../models/Video.js";

export const addComment = async (req, res, next) => {
  const newComment = new Comment({ ...req.body, userID: req.user.id });
  try {
    const comment = await Comment.findOne({userID: req.body.userID, videoID: req.body.videoID });
    if(comment){
      return res.status(400).json({
        message: "You've already commented on this video"
      });
    }else{
      const savedComment = await newComment.save();
      res.status(200).send(savedComment);
    }
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(res.params.id);
    const video = await Video.findById(res.params.id);
    if (req.user.id === comment.userId || req.user.id === video.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("The comment has been deleted.");
    } else {
      return next(createError(403, "You can delete ony your comment!"));
    }
  } catch (err) {
    next(err);
  }
};

export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoID: req.params.videoId });
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};