import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  deleteUser,
  getUser,
  login,
  logout,
  register,
} from "./user_controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", getUser);

export default router;
