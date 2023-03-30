import mongoose from "mongoose";

// const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    videoURL: {
      type: String,
      required: true,
    },
    imgURL: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    viewers: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    likes: {
      type: [String],
      default: [],
    },
    dislikes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("videos", VideoSchema);
