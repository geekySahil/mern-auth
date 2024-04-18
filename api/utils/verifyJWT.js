import  jwt  from "jsonwebtoken";
import { ApiError } from "./ApiError.js";
import { User } from "../models/user.model.js";


const verifyJWT = async (req, res, next) => {
    const token = await req.cookies.access_token
   //  console.log(token)

     if (!token){
        return next(new ApiError(401, "You are not signed in"));
     }
 
     const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
 
     console.log(decodedToken);
 
     const user = await User.findById(decodedToken?.userId);
 
     if(!user){
        return next(new ApiError(401, "User does not exist"));
     }
 
     req.user = user;
     await user.save()
     next();
   } 

    


export {verifyJWT}