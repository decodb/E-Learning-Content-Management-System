import pool from "../config/db.js"

// lecturers
export const lecturersCount = async() => {
  const result = await pool.query(
    `
      SELECT COUNT(*) AS total_users
      FROM users
      WHERE role_id = 2;
    `
  )

  return result.rows[0].total_users;
}

export const getLecturers = async(searchQuery, per_page, skip) => {
    const result = await pool.query(
        `
            SELECT 
              u.first_name,
              u.last_name,
              u.email,
              u.image_url,
              u.created_at,
              c.code,
              f.code
            FROM (
              SELECT *
              FROM users
              WHERE first_name ILIKE '%' || $1 || '%' OR last_name ILIKE '%' || $2 || '%'
              LIMIT $3 OFFSET $4
            ) AS u
            LEFT JOIN course c ON u.id = c.lecturer_id
            LEFT JOIN category f ON f.id = c.category_id
            WHERE u.role_id = 2;
        `, [searchQuery, searchQuery, per_page, skip]
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

// courses
export const coursesCount = async() => {
  const result = await pool.query(
    `
      SELECT COUNT(*) AS total_courses
      FROM course
    `
  )

  return result.rows[0].total_courses;
}

export const courses = async(searchQuery, per_page, skip) => {
  const result = await pool.query(
    `
      SELECT 
        c.name,
        c.code,
        c.description,
        f.code,
        u.image_url,
        u.first_name,
        u.last_name
        FROM (
          SELECT *
          FROM course
          WHERE name ILIKE '%' || $1 || '%'
          LIMIT $2 OFFSET $3
        ) AS c
        LEFT JOIN users u ON c.lecturer_id = u.id
        LEFT JOIN category f ON c.category_id = f.id
        WHERE u.role_id = 2;
    `, [searchQuery, per_page, skip]
  )

  return result.rows;
} 

export const addCourse = async (name, code, description, category, assign) => {
  const result = await pool.query(
    `
      INSERT INTO course (name, code, description, created_at, updated_at, lecturer_id, category_id)
      VALUES ($1, $2, $3, NOW(), NOW(), $4, $5)
      RETURNING *
    `,
    [name, code, description, assign, category]
  );

  return result.rows[0];
};

// category
export const categories = async() => {
  const result = await pool.query(
    `
      SELECT id, name
      FROM category
    `
  )

  return result.rows;
}

export const lecturers = async() => {
  const result = await pool.query(
    `
      SELECT id, first_name, last_name
      FROM users
      WHERE role_id = 2;
    `
  )

  return result.rows;
}

// profile
export const updateInfo = async(id, email, bio) => {
  const result = await pool.query(
    ` 
      UPDATE users
      SET email=$1, bio=$2
      WHERE id=$3 RETURNING *
    `,[email, bio, id]
  )

  return result.rows[0];
} 

// change password
export const changePassword = async(email, newPassword) => {
  const result = await pool.query(
    `
      UPDATE users
      SET password=$1
      WHERE email=$2 RETURNING *
    `, [newPassword, email]
  )

  return result.rows[0]
}

export const findUser = async(email) => {
  const result = await pool.query(
    `
      SELECT *
      FROM users
      WHERE email=$1
    `, [email]
  )

  return result.rows[0]
}