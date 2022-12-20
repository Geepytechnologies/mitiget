import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/users.js"
import videoRoute from "./routes/videos.js"
import commentRoute from "./routes/comments.js"
import authRoute from "./routes/auth.js"
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();
dotenv.config();

app.use(cors({origin: "*"}));
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/videos", videoRoute);
app.use("/api/comments", commentRoute);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Server error";
    return res.status(status).json({
        success: false,
        status,
        message
    })
})


const connect = ()=>{
  mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
    console.log("MongoDB is connected")
  })
  .catch((err)=>{
    throw err;
  })
}



app.listen(5000,()=>{
    connect();
    console.log("Backend server is running")}
)