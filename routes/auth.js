import express from "express";
import { googleAuth, signin, signup } from "../controllers/auth.js";

const router = express.Router();

router.post('/signup', signup)


router.post('/signin', signin);


//Google Auth
router.post('/googleauth', googleAuth)
export default router;