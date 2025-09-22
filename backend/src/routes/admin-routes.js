import express from "express"
import { authMiddleware } from "../middlewares/auth-middleware.js";
import { isAdmin } from "../middlewares/admin-middleware.js";
import { addLecturer, courses, getLecturers, updateInfo } from "../controllers/admin-controller.js";

const router = express.Router();

// lecturers
router.get('/lecturers/', authMiddleware, isAdmin, getLecturers);
router.post('/addLecturer/', authMiddleware, isAdmin, addLecturer);

// courses
router.get('/courses/', authMiddleware, isAdmin, courses)

// profile
router.put('/updateInfo/', authMiddleware, isAdmin, updateInfo);

export default router