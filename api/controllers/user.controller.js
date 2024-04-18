import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcrypt"

const deleteAccount = async (req, res, next) => {
    try {
        
        if(req.params.id !== req.user.id){
             next(new ApiError(401, "cannot delete due to unauthorized access"))
        }

        const delResposnse = await User.findByIdAndDelete(req.params.id);

        if (!delResposnse) {
            next(new ApiError(401, "something went wrong while deleting your account "))
        }

        console.log(delResposnse)
        
        res.clearCookie('access_token', {sameSite: 'lax', path: '/'} )


        res.status(201).json(new ApiResponse(201, delResposnse, 'account deleted successfully'))
        } catch (error) {
            res.status(201).json(new ApiResponse(201, {}, error))

        }


}

const updateAccount = async (req, res, next) => {

    if(req.params.id !== req.user.id){
        next(new ApiError(401, "Unauthorized access")) 
    }

    // const {username, email , password, profile} = req.body

    try {
       const updatedUser =  await User.findByIdAndUpdate(req.params.id, {
            $set:{
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                profile: req.body.profile
            }
        })

        if(!updatedUser){
            next( new ApiError(401, "something went wrong while updating the user"))
        }

        res.status(201).json(new ApiResponse(200, updatedUser, "User Updated Successfully"));
    } catch (error) {
        next(error);
    }
}

export { deleteAccount, updateAccount }


