import * as AdminService from '../services/admin-service.js'
import { sendNotFound, sendOk } from '../utils/http.util.js';

export const getLecturers = async(req, res, next) => {
    try {
        const lecturers = await AdminService.getLecturers();
        if(lecturers.length === 0) return sendNotFound(res, 'No lecturers found. ');

        sendOk(res, lecturers, 'Lecturers found. ');
    } catch(e) {
        next(e)
    }
}