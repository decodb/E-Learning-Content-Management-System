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

export const reviews = async(req, res, next) => {
    const courseId = req.params.id;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const numberOfReviews = await StudentService.countReviews(courseId);
        const numOfPages = Math.ceil(numberOfReviews / limit);

        const studentsReviews = await StudentService.reviews(courseId, limit, skip);
        if(!studentsReviews) return sendInternalServerError(res, 'Something went wrong. Please try again later. ');
        if(studentsReviews.length <= 0) return sendNotFound(res, 'No student has written a review. ');

        const data =  { currentPage: page, totalReviews: numberOfReviews,
                        totalPages: numOfPages, reviews: studentsReviews };

        return sendOk(res, data, 'Reviews successfully found. ');
    } catch(error) {
        next(error)
    }
}

export const myReviews = async(req, res, next) => {
    const studentId = req.userInfo.id;
    const courseId = req.params.id;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const numberOfReviews = await StudentService.countMyReviews(studentId, courseId);
        const numOfPages = Math.ceil(numberOfReviews / limit);

        const studentReviews = await StudentService.myReviews(studentId, courseId, limit, skip);
        if(!studentReviews) return sendInternalServerError(res, 'Something went wrong. Please try again later. ');
        if(studentReviews.length <= 0) return sendNotFound(res, 'You have not written a review for this course. ');

        const data =  { currentPage: page, totalReviews: numberOfReviews,
                        totalPages: numOfPages, reviews: studentReviews };

        return sendOk(res, data, 'Reviews successfully found. ');
    } catch(error) {
        next(error);
    }
}

export const createReview = async(req, res, next) => {
    const { rating, comment } = req.body;
    const studentId = req.userInfo.id;
    const courseId = req.params.id;

    try {
        if (!rating || rating < 1 || rating > 5) return sendBadRequest(res, 'Rating must be between 1 and 5.');
        if (!comment || typeof comment !== 'string' || comment.trim().length === 0) return sendBadRequest(res, 'Comment cannot be empty.');

        const enrollmentId = await StudentService.enrollment(studentId, courseId);
        if(!enrollmentId) return sendBadRequest(res, 'There is no such enrollment. ');

        const newlyCreatedReview = await StudentService.createReview(rating, comment, enrollmentId);
        if(!newlyCreatedReview) return sendInternalServerError(res, 'Something went wrong. ');

        return sendOk(res, newlyCreatedReview, 'Review successfully submitted. ');
    } catch(error) {
        next(error)
    }
}