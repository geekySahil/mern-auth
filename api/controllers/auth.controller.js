import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import jwt from "jsonwebtoken";

dotenv.config();

const signUp = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        next( new ApiError(401, "All Fields are required "))
    }

    const hashedPassword = await bcrypt.hash(password, 10)


    const newUser = new User({
        username, email, password: hashedPassword
    })


    if (!newUser) {
         next(new ApiError(500, "Something went wrong while creating the user"));
    }




    await newUser.save()

    console.log(newUser)


    return res.status(201).json(new ApiResponse(200,  newUser , "user created successfully"))

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




const signIn = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ApiError(401, "All Fields are reqired")) 
    }

    const user = await User.findOne({ email });

    if (!user) {
        return next(new ApiError(401, "user does not exist")) 
    }

    // console.log(user)
    // console.log(user._doc)



    const { password: hashedPassword, ...rest } = user._doc;



    // console.log(rest)

    const validatePassword = await bcrypt.compare(password, user.password);

    // console.log("isvalid:",validatePassword)



    if (!validatePassword) {
        next( new ApiError(401, "Incorrect Password ")) 
    }

    const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET);

    console.log(accessToken)

    if (!accessToken) {
         next(new ApiError(500, "Something went wrong while generating logging in "));
    }

    const expiryDate = new Date(Date.now() + 3600000);

   try {
     res
         .cookie('access_token', accessToken, { httpOnly: true, sameSite: 'lax', expires: expiryDate })
         .status(200)
         .json(new ApiResponse(200, rest, `${rest.username} logged in successfully`))
   } catch (error) {
    console.log(error)
    throw new ApiError(500, 'response failed')

   }

}


const google = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    try {
        if (user) {
            const accessToken = await jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET);


            const { password: hashedPassword, ...rest } = user._doc
            if (!accessToken) {
                next(new ApiError("Could not sign in with google"))
            }

            const expiryDate = new Date(Date.now() + 3600000);

            try {
                res.cookie("access_token", accessToken, {
                    httpOnly: true,
                    sameSite:'lax',
                    path: '/',
                    expires: expiryDate
                })
                // res.get('Set-Cookie')

                res.status(200).json(new ApiResponse(200, rest, "user signed in via google"));
            } catch (error) {
                console.log(error)
                next( new ApiError(500, 'response failed'))
                
            }


        }
        else {
            const generatePassword = Math.random().toString(36).slice(-16)

            const hashedPassword = await bcrypt.hashSync(generatePassword, 10);

            const username = req.body.name.split(" ").join('').toLowerCase() + Math.random().toString(36).slice(-8);

            console.log(username)



            const newUser = new User({
                username: username,
                email: req.body.email,
                password: hashedPassword,
                profile: req.body.photo
            })

            await newUser.save()

            const token = await jwt.sign({userId : newUser._id}, process.env.ACCESS_TOKEN_SECRET)

            const { password:hashedPassword2, ...rest } = newUser._doc;

            const expiryDate = new Date(Date.now() + 3600000)

            try {
                res.cookie("access_token", token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "lax",
                    expires: expiryDate
                }).status(200).json(new ApiResponse(200, rest, "Signed up successfully"))
            } catch (error) {
                console.log(error)
                next(new ApiError(500, "response failed ")) 
            }
        }
    } catch (error) {
        next(error);
    }
}

const signout = (req, res, next) => {
    res.status(200).clearCookie('access_token', {sameSite: 'lax',path: '/'})
    res.json(new ApiResponse(200, {}, "Signed Out Successfully"))
}

export { signIn, signUp, google, signout }