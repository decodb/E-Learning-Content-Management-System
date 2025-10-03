import express from "express";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import { isLecturer } from "../middlewares/lecturer-middleware.js";
import { course, courses, students } from "../controllers/lecturer-controller.js";

const router = express.Router();

router.get('/courses/', authMiddleware, isLecturer, courses)
router.get('/courses/:id/', authMiddleware, isLecturer, course)
router.get('/courses/:id/students', authMiddleware, isLecturer, students)

export default router;