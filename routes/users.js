import express from "express";
import { update, deleteUser, getUser, subscribe, unsubscribe, like, dislike, getAllUsers } from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//update user
router.put("/:id",verifyToken, update)

//delete user
router.put("/:id", verifyToken, deleteUser)

//get a user
router.get("/find/:id", getUser)

//get all users
router.get("/find", getAllUsers)

//subscribe a user
router.put("/subscribe/:id",verifyToken, subscribe)

//unsubscribe a user
router.put("/unsubscribe/:id", verifyToken, unsubscribe)


//like a video
router.put("/like/:videoId", verifyToken, like)


//dislike a video
router.put("/like/:videoId", verifyToken, dislike)




export default router;