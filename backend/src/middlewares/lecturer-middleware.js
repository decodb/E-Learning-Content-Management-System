import { sendForbidden } from "../utils/http.util.js"

export const isLecturer = (req, res, next) => {
    if (req.userInfo.role !== 'Lecturer') {
        return sendForbidden(res, "Access denied. Lecturer's rights reserved. ");
    }

    next()
}