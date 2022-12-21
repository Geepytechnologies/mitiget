import express from "express";
import { addComment, deleteComment, getComments } from "../controllers/comment.js";
import {verifyToken} from "../verifyToken.js"

/* const express = require("express");
const { addComment, deleteComment, getComments } = require("../controllers/comment.js");
const {verifyToken} = require("../verifyToken.js"); */
const router = express.Router();

router.post("/", verifyToken, addComment)
router.delete("/:id", verifyToken, deleteComment)
router.get("/:videoId", getComments)

export default router;