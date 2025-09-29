import express from "express";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import { isLecturer } from "../middlewares/lecturer-middleware.js";
import { course, courses } from "../controllers/lecturer-controller.js";

const router = express.Router();

router.get('/courses/', authMiddleware, isLecturer, courses)
router.get('/courses/:id/', authMiddleware, isLecturer, course)

export default router;