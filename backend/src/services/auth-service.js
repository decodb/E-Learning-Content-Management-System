import pool from "../config/db.js"

export const findUser = async(email) => {
    const result = await pool.query(
        `
            SELECT 
                u.id, 
                u.first_name, 
                u.last_name, 
                u.email, 
                u.password,
                u.image_url, 
                u.bio, 
                u.role_id,
                r.name AS role_name
            FROM users AS u
            LEFT JOIN role AS r ON r.id = u.role_id
            WHERE u.email=$1;
        `, [email]
    )

    return result.rows[0]
}

export const createUser = async(first_name, last_name, email, password, role_id = 1 ) => {
    const result = await pool.query(
        `
            INSERT INTO users(first_name, last_name, email, password, role_id)
            VALUES($1, $2, $3, $4, $5) RETURNING *
        `, [first_name, last_name, email, password, role_id]
    )

    return result.rows[0]
}