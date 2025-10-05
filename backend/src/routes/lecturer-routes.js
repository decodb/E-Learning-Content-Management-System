import express from "express";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import { isLecturer } from "../middlewares/lecturer-middleware.js";
import { course, courses, createStudent, files, reviews, students, uploadFile } from "../controllers/lecturer-controller.js";
import uploadMiddleware from '../middlewares/upload-middleware.js'

const router = express.Router();

router.get('/courses/', authMiddleware, isLecturer, courses)
router.get('/courses/:id/', authMiddleware, isLecturer, course)
router.get('/courses/:id/students', authMiddleware, isLecturer, students)
router.post('/courses/:id/students/add', authMiddleware, isLecturer, createStudent)
router.get('/courses/:id/reviews', authMiddleware, isLecturer, reviews)
router.post('/courses/:id/upload', authMiddleware, isLecturer, uploadMiddleware.single('file'), uploadFile)
router.get('/courses/:id/files', authMiddleware, isLecturer, files)

export default router;