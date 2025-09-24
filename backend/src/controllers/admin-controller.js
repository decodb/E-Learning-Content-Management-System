import * as AdminService from '../services/admin-service.js'
import * as AuthService from '../services/auth-service.js'
import { sendBadRequest, sendConflict, sendInternalServerError, sendNotFound, sendOk } from '../utils/http.util.js';
import bcrypt from 'bcrypt'
import { changePasswordVerification, sendLecturer } from '../utils/mailer.util.js';
import jwt from 'jsonwebtoken'

function generateRandomPassword(length = 12) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }
    return password;
}

// Lecturers
export const getLecturers = async(req, res, next) => {
    const search = req.query.search || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const numOfLecturers = await AdminService.lecturersCount();
        const numOfPages = Math.ceil(numOfLecturers / limit);

        const lecturers = await AdminService.getLecturers(search, limit, skip);
        if(!lecturers) return sendInternalServerError(res, 'Something went wrong. Please try again later.');
        if(lecturers.length <= 0) return sendNotFound(res, 'No lecturers found. ');

        const data =  { currentPage: page, totalLecturers: parseInt(numOfLecturers),
                        totalPages: numOfPages, lecturers: lecturers };

        sendOk(res, data, 'Lectures successfully found. ');
    } catch(e) {
        next(e)
    }
}

export const addLecturer = async(req, res, next) => {
    const { first_name, last_name, email } = req.body;

    try {
        const lecturer = await AdminService.getLecturer(email);
        if(lecturer) return sendConflict(res, 'A lecturer with this email already exists. ');

        const generatedPassword = generateRandomPassword();
        const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT) || 10)
        const hashed_password = await bcrypt.hash(generatedPassword, salt)

        const newlyCreatedLecturer = await AdminService.addLecturer(first_name, last_name, email, hashed_password);
        if(!newlyCreatedLecturer) return sendInternalServerError(res, 'Something went wrong. Try again later. ');

        await sendLecturer(email, generatedPassword);
        
        sendOk(res, newlyCreatedLecturer, 'A lecturer successfully added. ');
    } catch(e) {
        next(e)
    }
}

// Courses
export const courses = async(req, res, next) => {
    const search = req.query.search || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const numOfCourses = await AdminService.lecturersCount();
        const numOfPages = Math.ceil(numOfCourses / limit);

        const courses = await AdminService.courses(search, limit, skip);
        if(!courses) return sendInternalServerError(res, 'Something went wrong. Please try again later.');
        if(courses.length <= 0) return sendNotFound(res, 'No lecturers found. ');

        const data =  { currentPage: page, totalCourses: parseInt(numOfCourses),
                        totalPages: numOfPages, courses: courses };

        sendOk(res, data, 'Courses successfully found. ');

    } catch(e) {
        next(e)
    }
}

export const addCourse = async(req, res, next) => {
    const {name, code, description, category, assign } = req.body
    
    try {
        const newCourse = await AdminService.addCourse(name, code, description, Number(category), Number(assign))
        if(!newCourse) return sendInternalServerError(res, 'Something went wrong, please try again later. ');

        sendOk(res, newCourse, 'New course successfully created. ');
    } catch(error) {
        next(error);
    }
}

export const categories = async(req, res, next) => {
    try {
        const categories = await AdminService.categories();
        if(!categories) return sendInternalServerError(res, 'Something went wrong. Please try again later.');
        if(categories.length <= 0) return sendNotFound(res, 'No categories found');

        sendOk(res, categories, 'Categories successfully found. ')
    } catch(error) {
        next(error)
    }
}

export const lecturers = async(req, res, next) => {
    try {
        const lecturers = await AdminService.lecturers();
        if(!lecturers) return sendInternalServerError(res, 'Something went wrong. Please try again later.');
        if(lecturers.length <= 0) return sendNotFound(res, 'No lecturers found. ');

        sendOk(res, lecturers, 'Lecturers successfully found. ');
    } catch(error) {
        next(error);
    }
}

// profile
export const updateInfo = async(req, res, next) => {
    const { email, bio } = req.body;
    
    try {
        const updatedUser = await AdminService.updateInfo(req.userInfo.id ,email, bio);
        if(!updatedUser) return sendBadRequest(res, "Couldn't update your information, please try again later. ");

        const user = await AuthService.findUser(updatedUser.email);
        if(!user) return sendBadRequest(res, 'There is no user with this emaail. ');

        const updatedToken = jwt.sign({
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            image: user.image_url,
            bio: user.bio,
            role: user.role_name
            }, process.env.JWT_SECRET_TOKEN, {
            expiresIn: '1hr'
        })

        sendOk(res, updatedToken, "Information successfully updated. ");
    } catch(error) {
        next(error)
    }
}

// change password
export const changePassword = async(req, res, next) => {
    const email = req.userInfo.email;
    const { oldPassword, newPassword } = req.body;

    try {
        const user = await AdminService.findUser(email);
        if(!user) return sendBadRequest(res, 'There is no user with this email address. ');

        const passwordsMatch = await bcrypt.compare(oldPassword, user.password);
        if(!passwordsMatch) return sendBadRequest(res, 'Invalid credentials. ');

        const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT) || 10)
        const hashed_password = await bcrypt.hash(newPassword, salt)

        const updatedUser = await AdminService.changePassword(email, hashed_password);
        if(!updatedUser) return sendInternalServerError(res, 'Something went wrong. There again later. ');

        await changePasswordVerification(user.email);
        sendOk(res, updatedUser, 'Password successfully changed. ')
    } catch(error) {
        next(error)
    }
}