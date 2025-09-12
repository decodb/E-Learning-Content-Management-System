import pool from "../config/db.js"

export const getLecturers = async() => {
    const result = await pool.query(
        `
            SELECT 
                u.first_name,
                u.last_name,
                u.email,
                u.image_url,
                u.created_at,
                r.name AS role_name
            FROM users u
            JOIN role r 
                ON u.role_id = r.id
            WHERE u.role_id = 2; 
        `
    )

    return result.rows
}