import express from "express";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import { isStudent } from "../middlewares/student-middleware.js";
import { course, courses } from "../controllers/student-controller.js";

const router = express.Router();

router.get('/courses/', authMiddleware, isStudent, courses)
router.get('/courses/:id/', authMiddleware, isStudent, course)

export default router;