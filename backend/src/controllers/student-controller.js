import * as StudentService from '../services/student-service.js'
import { sendBadRequest, sendInternalServerError, sendNotFound, sendOk } from '../utils/http.util.js';

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

export const course = async(req, res, next) => {
    const id = req.params.id;

    try {
        if(!id || isNaN(id)) return sendBadRequest(res, 'Which course? ');

        const courseDetails = await StudentService.course(id);
        if(!courseDetails) sendBadRequest(res, "The course requested isn't available. ");
        
        return sendOk(res, courseDetails, "The course requested is found. ");
    } catch(error) {
        next(error)
    }
}

export const files = async(req, res, next) => {
    const courseId = req.params.id;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const numberOfFiles = await StudentService.countFiles(courseId);
        const numOfPages = Math.ceil(numberOfFiles / limit);

        const courseFiles = await StudentService.files(courseId, limit, skip);
        if(!courseFiles) return sendInternalServerError(res, 'Something went wrong. Please try again later. ');
        if(courseFiles.length <= 0) return sendNotFound(res, 'No student has written a review. ');

        const data =  { currentPage: page, totalFiles: Number(numberOfFiles),
                        totalPages: numOfPages, files: courseFiles };

        sendOk(res, data, 'Files successfully found. ');
    } catch(error) {
        next(error)
    }
}