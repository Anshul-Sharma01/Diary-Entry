import express from "express";
import { registerAccount, login } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", registerAccount);
router.post("/login", login);

export default router;
