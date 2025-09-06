import pool from "../config/db.js"

export const findUser = async(email) => {
    const result = await pool.query(
        `
            SELECT * FROM users WHERE email=$1
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