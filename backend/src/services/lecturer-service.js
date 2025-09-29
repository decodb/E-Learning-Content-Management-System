import pool from "../config/db.js";

export const courses = async(searchQuery, per_page, skip, lecturerId, roleId) => {
  const result = await pool.query(
    `
      SELECT c.name, c.code, c.description, c.created_at, u.first_name, u.last_name, f.code  
        FROM (
            SELECT *
            FROM course
            WHERE name ILIKE '%' || $1 || '%'
            LIMIT $2 OFFSET $3
        ) AS c
        LEFT JOIN users u ON u.id = c.lecturer_id
        LEFT JOIN category f ON f.id = c.category_id
        WHERE u.id=$4 AND u.role_id = $5;
    `, [searchQuery, per_page, skip, lecturerId, roleId]
  )

  return result.rows;
} 

export const coursesCount = async(lecturerId) => {
    const result = await pool.query(
        `
            SELECT COUNT(*) AS total_courses
            FROM course
            WHERE lecturer_id = $1;
        `, [lecturerId]
    )

    return result.rows[0].total_courses;
}