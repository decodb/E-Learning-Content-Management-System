import { sendUnauthorized } from "../utils/http.util.js";
import jwt from "jsonwebtoken"

export const authMiddleware = (req, res, next) => {
    
    const authHeaders = req.headers["authorization"];
    const token = authHeaders && authHeaders.split(" ")[1]
    console.log(token)

    if (!token) {
        return sendUnauthorized(res, 'Access denied. Please log in. ')
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN)
        req.userInfo = decodedToken
        console.log(decodedToken)
        next()
    } catch(error) {
        return sendUnauthorized(res, 'Access denied. Please log in. ')
    }
}