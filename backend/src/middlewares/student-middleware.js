import { sendForbidden } from "../utils/http.util.js"

export const isStudent = (req, res, next) => {
    if (req.userInfo.role !== 'Student') {
        return sendForbidden(res, "Access denied. Student's rights reserved. ");
    }

    next()
}