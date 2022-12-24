import jwt from "jsonwebtoken";
import { createError } from "./error.js";


export const verifyToken = (req,res,next) => {
    const token = req.cookies._token;
    if(!token) return next(createError(401, "You are not authenticated"))

    jwt.verify(token, process.env.SECRET, (err,user)=>{
        if(err) return next(createError(403,"Token is not valid!"))
        req.user = user;
        next();
    })
}