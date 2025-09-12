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

export const getLecturer = async(email) => {
    const result = await pool.query(
        `
            SELECT * FROM users
            WHERE email=$1
        `, [email]
    )

    return result.rows[0]
}

export const addLecturer = async (first_name, last_name, email, password, role = 2) => {
  const result = await pool.query(
    `
      INSERT INTO users (
        first_name,
        last_name,
        email,
        password,
        role_id,
        created_at
      ) 
      VALUES ($1, $2, $3, $4, $5, NOW())
      RETURNING *;
    `,
    [first_name, last_name, email, password, role]
  );

  return result.rows[0];
};