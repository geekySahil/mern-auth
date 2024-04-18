import express from "express"
import dotenv from "dotenv"
import { Router } from "express";
import cors from "cors"
import mongoose from 'mongoose'
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import cookieParser from "cookie-parser";
import path from "path"

const app = express();
const router = Router();

dotenv.config();

app.use(cookieParser());

const __dirname = path.resolve();  //make sure paths are resolved correctly regardless of where the script is executed from.
app.use(express.json());

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});


// AwqDDfVk2TSAAihj

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log("Connected To Mongodb");
}).catch((err) => {
  console.log(err)
})

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

// app.use("/api/user/", userRouter);
app.use("/api/auth/", authRoutes);
app.use("/api/user/", userRoutes);





app.listen(3000, () => {
  console.log(`Server is running on Port ${3000}`);
});




export {app}