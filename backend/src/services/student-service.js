import pool from "../config/db.js"

export const coursesCount = async(student_id) => {
    const result = await pool.query(
        `
            SELECT COUNT(*) AS total_courses
            FROM course_enrollments
            WHERE user_id = $1;
        `, [student_id]
    )

    return result.rows[0].total_courses
}

export const courses = async(student_id, searchQuery, per_page, skip) => {
    const result = await pool.query(
        `
            SELECT 
                c.id AS id,
                c.name AS name, 
                c.code AS code, 
                c.description AS description,  
                u.first_name AS first_name, 
                u.last_name AS last_name, 
                u.image_url AS image_url
            FROM (
                SELECT * 
                FROM course
                WHERE name ILIKE '%' || $1 || '%'
                LIMIT $2 OFFSET $3
            ) AS c
            LEFT JOIN category f ON c.category_id = f.id
            LEFT JOIN users u ON c.lecturer_id = u.id 
            LEFT JOIN course_enrollments e ON c.id = e.course_id
            WHERE e.user_id = $4;
        `, [searchQuery, per_page, skip, student_id]
    )

    return result.rows;
}

export const course = async(id) => {
  const result = await pool.query(
    `
      SELECT * FROM course
      WHERE id=$1
    `, [id]
  )

  return result.rows[0]
}