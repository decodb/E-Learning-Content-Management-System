import * as LecturerService from '../services/lecturer-service.js'
import { sendBadRequest, sendInternalServerError, sendNotFound, sendOk } from '../utils/http.util.js';

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

        return sendOk(res, data, 'Courses successfully found. ');
    } catch(error) {
        next(error)
    }
}

export const course = async(req, res, next) => {
    const id = req.params.id;

    try {
        if(!id || isNaN(id)) return sendBadRequest(res, 'Which course? ');

        const courseDetails = await LecturerService.course(id);
        if(!courseDetails) sendBadRequest(res, "The course requested isn't available. ");
        
        return sendOk(res, courseDetails, "The course requested is found. ");
    } catch(error) {
        next(error)
    }
}

export const students = async(req, res, next) => {
    const id = req.params.id;

    const search = req.query.search || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;


    try {
        const numberOfStudents = await LecturerService.studentsCount(id);
        const numOfPages = Math.ceil(numberOfStudents / limit);

        const students = await LecturerService.students(id, search, limit, skip);
        if(!students) return sendInternalServerError(res, 'Something went wrong. Please try again later.');
        if(students.length <= 0) return sendNotFound(res, 'No student has enrolled for this course. ');

        const data =  { currentPage: page, totalCourses: parseInt(numberOfStudents),
                        totalPages: numOfPages, students: students };

        return sendOk(res, data, 'Students successfully found. ');
    } catch(error) {
        next(error)
    }
}