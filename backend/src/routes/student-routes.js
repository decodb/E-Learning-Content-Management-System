import express from "express";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import { isStudent } from "../middlewares/student-middleware.js";
import { course, courses, files } from "../controllers/student-controller.js";

const router = express.Router();

router.get('/courses/', authMiddleware, isStudent, courses)
router.get('/courses/:id/', authMiddleware, isStudent, course)
router.get('/courses/:id/content', authMiddleware, isStudent, files)

export default router;