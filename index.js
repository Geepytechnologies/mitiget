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

app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Credentials", true)
  next();
})
app.use(cors({origin: process.env.DOMAIN, credentials: true}));
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

app.get('/', (req,res)=>{
  res.send("Reveal")
})

const connect = ()=>{
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.MONGODB_URI)
  .then(()=>{
    console.log("MongoDB is connected")
  })
  .catch((err)=>{
    throw err;
  })
}

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    connect();
    console.log("Backend server is running")}
)

// module.exports = app;