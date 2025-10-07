import express from "express";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import { isStudent } from "../middlewares/student-middleware.js";
import { course, courses, createReview, files, myReviews, reviews } from "../controllers/student-controller.js";

const router = express.Router();

router.get('/courses/', authMiddleware, isStudent, courses)
router.get('/courses/:id/', authMiddleware, isStudent, course)
router.get('/courses/:id/content', authMiddleware, isStudent, files)
router.get('/courses/:id/reviews', authMiddleware, isStudent, reviews)
router.get('/courses/:id/my-reviews', authMiddleware, isStudent, myReviews)
router.post('/courses/:id/write-review', authMiddleware, isStudent, createReview)

export default router;