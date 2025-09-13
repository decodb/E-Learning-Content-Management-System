import * as AdminService from '../services/admin-service.js'
import { sendConflict, sendInternalServerError, sendNotFound, sendOk } from '../utils/http.util.js';
import bcrypt from 'bcrypt'
import { sendLecturer } from '../utils/mailer.util.js';

function generateRandomPassword(length = 12) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }
    return password;
}

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