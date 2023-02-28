import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  createCourse,
  deleteCourse,
  getCourse,
  getCourses,
} from "./course_controller.js";

const router = express.Router();

router.post("/", verifyToken, createCourse);
router.delete("/:id", verifyToken, deleteCourse);
router.get("/single/:id", getCourse);
router.get("/", getCourses);

export default router;
