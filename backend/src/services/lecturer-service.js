import pool from "../config/db.js";

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

export const courses = async(searchQuery, per_page, skip, lecturerId, roleId) => {
  const result = await pool.query(
    `
      SELECT c.id, c.name, c.code, c.description, u.image_url, u.first_name, u.last_name, f.code  
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

export const course = async(id) => {
  const result = await pool.query(
    `
      SELECT
          c.id,
          c.name, 
          c.description, 
          c.created_at, 
          c.updated_at, 
          f.name AS category_name, 
          COALESCE(AVG(r.rating), 0) AS average_rating, 
          COUNT(r.enrollment_id) AS total_reviews
      FROM course c 
      LEFT JOIN category f ON f.id = c.category_id
      LEFT JOIN course_enrollments e ON e.course_id = c.id
      LEFT JOIN reviews r ON r.enrollment_id = e.id
      WHERE c.id = $1
      GROUP BY c.id, f.name;
    `, [id]
  )
  
  return result.rows[0];
}

export const studentsCount = async(id) => {
    const result = await pool.query(
        `
            SELECT COUNT(*) AS total_students
            FROM course_enrollments
            WHERE course_id = $1;
        `, [id]
    )

    return result.rows[0].total_courses;
}

export const students = async(id, searchQuery, per_page, skip) => {
  const result = await pool.query(
    `
      SELECT u.id, u.first_name, u.last_name, u.email, u.image_url, c.enrolled_at, c.grade, c.status
      FROM (
        SELECT * 
        FROM users 
        WHERE first_name ILIKE '%' || $1 || '%' OR last_name ILIKE '%' || $2 || '%'
        LIMIT $3 OFFSET $4
      ) AS u
      LEFT JOIN course_enrollments c ON u.id = c.user_id
      WHERE c.course_id = $5;
    `, [searchQuery, searchQuery, per_page, skip, id]
  )

  return result.rows;
}

export const createStudent = async(first_name, last_name, email, password) => {
  const result = await pool.query(
    `
      INSERT INTO users(first_name, last_name, email, password, created_at, role_id)
      VALUES($1, $2, $3, $4,NOW(), 3) RETURNING *
    `, [first_name, last_name, email, password]
  )
  
  return result.rows[0];
}

export const registerStudent = async(student_id, course_id) => {
  const result = await pool.query(
    `
      INSERT INTO course_enrollments(user_id, course_id, enrolled_at, status)
      VALUES($1, $2, NOW(), 'active') RETURNING *
    `, [student_id, course_id]
  )

  return result.rows[0];
}

export const student = async(email) => {
  const result = await pool.query(
    `
      SELECT * FROM users
      WHERE email=$1
    `, [email]
  )

  return result.rows[0]
}

export const module = async(id) => {
  const result = await pool.query(
    `
      SELECT * FROM course
      WHERE id=$1
    `, [id]
  )

  return result.rows[0]
}

export const reviews = async(course_id, per_page, skip) => {
  const result = await pool.query(
    `
      SELECT r.id, r.rating, r.comment, r.created_at, u.first_name, u.last_name, u.image_url
      FROM reviews r
      INNER JOIN course_enrollments c ON c.id = r.enrollment_id
      INNER JOIN users u ON u.id = c.user_id
      WHERE u.role_id = 3 AND c.course_id = $1
      ORDER BY r.created_at DESC
      LIMIT $2 OFFSET $3;
    `, [course_id ,per_page, skip]
  )

  return result.rows;
}

export const countReviews = async(id) => {
  const result = await pool.query(
    `
      SELECT COUNT(*) AS total_reviews
      FROM reviews r
      INNER JOIN course_enrollments c ON c.id = r.enrollment_id
      WHERE c.course_id = $1;
    `, [id]
  )

  return result.rows[0].total_reviews;
}

export const createFile = async (title, type, url, public_id, size, module_id) => {
  const result = await pool.query(
    `
      INSERT INTO file (title, type, url, public_id, size, uploaded_at, updated_at, is_active, module_id)
      VALUES ($1, $2, $3, $4, $5, NOW(), NOW(), TRUE, $6)
      RETURNING *;
    `,
    [title, type, url, public_id, size, module_id]
  );

  return result.rows[0];
};

export const countFiles = async(module_id) => {
  const result = await pool.query(
    `
      SELECT COUNT(*) AS total_files
      FROM file
      WHERE module_id = $1;
    `, [module_id]
  )

  return result.rows[0].total_files;
}

export const files = async(module_id, per_page, skip) => {
  const result = await pool.query(
    `
      SELECT id, title, type, url, size, uploaded_at, is_active
      FROM file
      WHERE module_id = $1
      ORDER BY uploaded_at
      LIMIT $2 OFFSET $3;
    `, [module_id, per_page, skip]
  )

  return result.rows;
}