import { sendForbidden } from "../utils/http.util.js"

export const isAdmin = (req, res, next) => {
    if (req.userInfo.role !== 1) {
        return sendForbidden(res, 'Access denied. Admin rights reserved. ');
    }

    next()
}