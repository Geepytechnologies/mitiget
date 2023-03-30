import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/users.js";
import videoRoute from "./routes/videos.js";
import commentRoute from "./routes/comments.js";
import authRoute from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { URL } from "url";

const __dirname = new URL(".", import.meta.url).pathname;

const app = express();
dotenv.config();

const myclient = path.join(__dirname + "../frontend/dist"); //

app.use(cors({ origin: process.env.DOMAIN, credentials: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", process.env.DOMAIN);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
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
    message,
  });
});

/* if(process.env.NODE_ENV === "production"){
    app.use(express.static("/dist"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname + "dist", "index.html"));
    })
} */
app.use(express.static("dist"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname + "dist" + "/index.html"));
});
app.get("/", (req, res) => {
  res.send("Reveal");
});
const connect = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("MongoDB is connected");
    })
    .catch((err) => {
      throw err;
    });
};

const port = process.env.PORT || 5000;

app.listen(port, () => {
  connect();
  console.log("Backend server is running");
});

// module.exports = app;
