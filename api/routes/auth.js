import express from "express";
import { login, register, logout, verifyPassword  } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.post('/verify-password', verifyPassword)


export default router;