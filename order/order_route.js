import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { confirm, getOrders, intent } from "./order_controller.js";

const router = express.Router();

// router.post("/:gigId", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);
router.post("/create-payment-intent/:id", verifyToken, intent);
router.put("/", verifyToken, confirm);

export default router;
