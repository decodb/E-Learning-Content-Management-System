import express from "express"
import { authMiddleware } from "../middlewares/auth-middleware.js";
import { isAdmin } from "../middlewares/admin-middleware.js";
import { addCourse, addLecturer, categories, changePassword, courses, getLecturers, lecturers, updateInfo } from "../controllers/admin-controller.js";

const router = express.Router();

// lecturers
router.get('/lecturers/', authMiddleware, isAdmin, getLecturers);
router.post('/addLecturer/', authMiddleware, isAdmin, addLecturer);

// courses
router.get('/courses/', authMiddleware, isAdmin, courses);
router.get('/categories/', authMiddleware, isAdmin, categories);
router.get('/assignLecturers/', authMiddleware, isAdmin, lecturers);
router.post('/addCourse', authMiddleware, isAdmin, addCourse)

// profile
router.put('/updateInfo/', authMiddleware, isAdmin, updateInfo);
router.put('/changePassword/', authMiddleware, isAdmin, changePassword);

export default router