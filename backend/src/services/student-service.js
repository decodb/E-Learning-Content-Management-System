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

export const countMyReviews = async (student_id, course_id) => {
  const result = await pool.query(
    `
      SELECT COUNT(*) AS total_reviews
      FROM reviews r
      INNER JOIN course_enrollments c ON c.id = r.enrollment_id
      WHERE c.user_id = $1 AND c.course_id = $2;
    `,
    [student_id, course_id]
  );

  return result.rows[0].total_reviews;
};

export const myReviews = async(student_id,course_id, per_page, skip) => {
  const result = await pool.query(
    `
      SELECT r.id, r.rating, r.comment, r.created_at, u.first_name, u.last_name, u.image_url
      FROM reviews r
      INNER JOIN course_enrollments c ON c.id = r.enrollment_id
      INNER JOIN users u ON u.id = c.user_id
      WHERE c.user_id = $1 AND c.course_id = $2
      ORDER BY r.created_at DESC
      LIMIT $3 OFFSET $4;
    `, [student_id, course_id ,per_page, skip]
  )

  return result.rows;
}

export const enrollment = async (student_id, course_id) => {
  const result = await pool.query(
    `
      SELECT id
      FROM course_enrollments
      WHERE user_id = $1 AND course_id = $2
      LIMIT 1
    `,
    [student_id, course_id]
  );

  return result.rows.length > 0 ? result.rows[0].id : null;
};

export const createReview = async (rating, comment, enrollment_id) => {
  const result = await pool.query(
    `
      INSERT INTO reviews (rating, comment, created_at, enrollment_id)
      VALUES ($1, $2, NOW(), $3)
      RETURNING *
    `,
    [rating, comment, enrollment_id]
  );

  return result.rows[0];
};
