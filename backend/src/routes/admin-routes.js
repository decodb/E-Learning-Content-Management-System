import express from "express"
import { authMiddleware } from "../middlewares/auth-middleware.js";
import { isAdmin } from "../middlewares/admin-middleware.js";
import { addLecturer, getLecturers } from "../controllers/admin-controller.js";

const router = express.Router();

router.get('/lecturers/', authMiddleware, isAdmin, getLecturers);
router.post('/addLecturer/', authMiddleware, isAdmin, addLecturer);

export default router