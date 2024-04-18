import { Router } from "express";
import cookieParser from "cookie-parser";
import { signIn } from "../controllers/auth.controller.js";
import { signUp } from "../controllers/auth.controller.js";
import { google } from "../controllers/auth.controller.js";
import { signout } from "../controllers/auth.controller.js";

const router = Router();
router.use(cookieParser())

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/google', google)
router.delete('/signout', signout)

export default router