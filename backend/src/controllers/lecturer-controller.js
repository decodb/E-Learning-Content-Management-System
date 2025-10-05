import * as LecturerService from '../services/lecturer-service.js'
import { sendBadRequest, sendConflict, sendInternalServerError, sendNotFound, sendOk } from '../utils/http.util.js';
import bcrypt from 'bcrypt'
import { sendStudent } from '../utils/mailer.util.js';
import { uploadToCloudinary } from '../utils/cloudinary.util.js';
import path from 'path'
import fs from "fs";

function generateRandomPassword(length = 12) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }
    return password;
}

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

export const createStudent = async(req, res, next) => {
    const course_id = req.params.id;
    const { first_name, last_name, email } = req.body;

    try {
        const student = await LecturerService.student(email);
        if(student) return sendConflict(res, 'A student with this email already exists. ');

        const generatedPassword = generateRandomPassword();
        const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT) || 10);
        const hashed_password = await bcrypt.hash(generatedPassword, salt);

        const newUser = await LecturerService.createStudent(first_name, last_name, email, hashed_password);
        if(!newUser) return sendInternalServerError(res, 'Something went wrong. Please try again later. ');

        const newlyRegisteredStudent = await LecturerService.registerStudent(newUser.id, course_id);
        if(!newlyRegisteredStudent) return sendInternalServerError(res, 'Something went wrong. Please try again later. ');

        const module = await LecturerService.module(course_id);
        if(!module) return sendInternalServerError(res, 'Something went wrong. Please try again. ');

        await sendStudent(newUser.first_name, newUser.last_name, newUser.email, generatedPassword, module.name);

        const data = { user: newUser, enrollment: newlyRegisteredStudent };

        sendOk(res, data, 'A student successfully added to the course. ');

    }catch(error) {
        next(error)
    }
}

export const reviews = async(req, res, next) => {
    const courseId = req.params.id;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const numberOfReviews = await LecturerService.countReviews(courseId);
        const numOfPages = Math.ceil(numberOfReviews / limit);

        const studentsReviews = await LecturerService.reviews(courseId, limit, skip);
        if(!studentsReviews) return sendInternalServerError(res, 'Something went wrong. Please try again later. ');
        if(studentsReviews.length <= 0) return sendNotFound(res, 'No student has written a review. ');

        const data =  { currentPage: page, totalReviews: numberOfReviews,
                        totalPages: numOfPages, reviews: studentsReviews };

        sendOk(res, data, 'Reviews successfully found. ');
    } catch(error) {
        next(error)
    }
}

export const uploadFile = async(req, res, next) => {
    const course_id = req.params.id;
    const { title } = req.body;
    const file = req.file;

    try {
        if(!file) return sendBadRequest(res, 'No file uploaded. ');

        const extension = path.extname(file.originalname).toLowerCase();
        const resourceType = extension === ".mp4" ? "video"  : extension === ".png" || extension === ".jpg" || extension === ".jpeg" ? "image" : "raw"; 

        const { url, public_id } = await uploadToCloudinary(file.path, resourceType);

        const newVideo = await LecturerService.createFile(title, file.mimetype, url, public_id, file.size, course_id);
        if(!newVideo) return sendInternalServerError(res, 'Something went wrong. Please try again later. ');

        const module = await LecturerService.course(newVideo.module_id);
        if(!module) return sendInternalServerError(res, 'Something went wrong while fetching the course for this video. ');

        fs.unlinkSync(file.path);
        
        return sendOk(res, newVideo, 'Video successfully uploaded. ')
    } catch(error) {
        next(error);
    }
}

export const files = async(req, res, next) => {
    const courseId = req.params.id;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const numberOfFiles = await LecturerService.countFiles(courseId);
        const numOfPages = Math.ceil(numberOfFiles / limit);

        const courseFiles = await LecturerService.files(courseId, limit, skip);
        if(!courseFiles) return sendInternalServerError(res, 'Something went wrong. Please try again later. ');
        if(courseFiles.length <= 0) return sendNotFound(res, 'No student has written a review. ');

        const data =  { currentPage: page, totalFiles: numberOfFiles,
                        totalPages: numOfPages, files: courseFiles };

        sendOk(res, data, 'Files successfully found. ');
    } catch(error) {
        next(error)
    }
}