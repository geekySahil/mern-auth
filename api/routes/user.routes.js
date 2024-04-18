import { Router } from "express";
import { deleteAccount, updateAccount } from "../controllers/user.controller.js";
import { verifyJWT } from "../utils/verifyJWT.js";


const router = Router();

router.delete('/delete/:id', verifyJWT, deleteAccount)
router.post('/update/:id',verifyJWT,  updateAccount)


export default router;