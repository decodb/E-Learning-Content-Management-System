import * as LecturerService from '../services/lecturer-service.js'
import { sendOk } from '../utils/http.util.js';

export const courses = async(req, res, next) => {
    const { id, roleId } = req.userInfo;

    const search = req.query.search || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const numberOfCourses = await LecturerService.coursesCount(id);
        const numOfPages = Math.ceil(numberOfCourses / limit);

        const courses = await LecturerService.courses(search, limit, skip, id, roleId);
        if(!courses) return sendInternalServerError(res, 'Something went wrong. Please try again later.');
        if(courses.length <= 0) return sendNotFound(res, 'No lecturers found. ');

        const data =  { currentPage: page, totalCourses: parseInt(numberOfCourses),
                        totalPages: numOfPages, courses: courses };

        sendOk(res, data, 'Courses successfully found. ');
    } catch(error) {
        next(error)
    }
}