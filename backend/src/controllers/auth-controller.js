import * as AuthService from '../services/auth-service.js'
import { sendBadRequest, sendConflict, sendOk } from '../utils/http.util.js';
import { sendAdmin } from '../utils/mailer.util.js';
import bcrypt from 'bcrypt'
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

export const register = async(req, res, next) => {

    const { first_name, last_name, email } = req.body;

    try {
        const user = await AuthService.findUser(email);
        if(user) return sendConflict(res, 'User with this email already exists. ');

        const generatedPassword = generateRandomPassword();

        const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT) || 10)
        const hashed_password = await bcrypt.hash(generatedPassword, salt)

        const newlyCreatedUser = await AuthService.createUser(first_name, last_name, email, hashed_password);

        if(!newlyCreatedUser) return sendInternalServerError(res, 'Something went wrong. Please try again later. ');

        await sendAdmin(email, generatedPassword);

        sendOk(res, newlyCreatedUser, 'An admin successfully added. ');

    } catch(error) {
        next(error)
    }

}

export const login = async(req, res, next) => {
    const { email, password } = req.body;

    try {  
        const user = await AuthService.findUser(email);
        if(!user) return sendBadRequest(res, 'Invalid credentials. ');

        const passwordsMatch = await bcrypt.compare(password, user.password);
        if(!passwordsMatch) return sendBadRequest(res, 'Invalid credentials. ');

        const accessToken = jwt.sign({
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            image: user.image_url,
            bio: user.bio,
            roleId: user.role_id, 
            role: user.role_name
            }, process.env.JWT_SECRET_TOKEN, {
            expiresIn: '1hr'
        })

        sendOk(res, accessToken, "Logged in successfully. ");

    } catch(error) {
        next(error)
    }
}