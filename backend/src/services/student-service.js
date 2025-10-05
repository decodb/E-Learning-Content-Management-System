import pool from "../config/db.js"

export const courses = async(student_id, searchQuery, per_page, skip) => {
    const result = await pool.query(
        `
            SELECT 
                c.name, 
                c.code AS course_code, 
                c.description, 
                f.code AS category_code, 
                u.first_name AS lecturer_firstName, 
                u.last_name AS lecturer_lastName, 
                u.image_url AS lecturer_profilePicture
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