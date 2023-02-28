import express from "express";
import { connectDB } from "./database/db.js";

const app = express();

app.listen(3000, () => {
  connectDB();
  console.log("server is running on port 3000");
});
