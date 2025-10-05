import * as StudentService from '../services/student-service.js'
import { sendInternalServerError, sendNotFound, sendOk } from '../utils/http.util.js';

export const courses = async(req, res, next) => {
    const studentId = req.userInfo.id;

    const search = req.query.search || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const numOfCourses = await StudentService.coursesCount(studentId);
        const numOfPages = Math.ceil(numOfCourses / limit);

        const studentCourses = await StudentService.courses(studentId, search, limit, skip);
        if(!studentCourses) return sendInternalServerError(res, 'Something went wrong. Please try again later.');
        if(studentCourses.length <= 0) return sendNotFound(res, 'No courses found. ');

        const data =  { currentPage: page, totalCourse: parseInt(numOfCourses),
                        totalPages: numOfPages, courses: studentCourses };

        sendOk(res, data, 'Courses successfully found. ');
    } catch(error) {
        next(error);
    }
}