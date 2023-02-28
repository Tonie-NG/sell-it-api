import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import conversationRoute from "./conversation/conversation_route.js";
import courseRoute from "./course/course_route.js";
import { connectDB } from "./database/db.js";
import messageRoute from "./message/message_route.js";
import orderRoute from "./order/order_route.js";
import reviewRoute from "./review/review_route.js";
import userRoute from "./user/user_route.js";

const app = express();
dotenv.config();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("users", userRoute);
app.use("/course", courseRoute);
app.use("/orders", orderRoute);
app.use("/conversations", conversationRoute);
app.use("/messages", messageRoute);
app.use("/reviews", reviewRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});

app.listen(3000, () => {
  connectDB();
  console.log("server is running on port 3000");
});
