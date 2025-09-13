CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    image_url VARCHAR(255),
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role_id INT NOT NULL,
    CONSTRAINT fk_role
        FOREIGN KEY (role_id)
        REFERENCES role (id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE TABLE category (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  code VARCHAR(20) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE course (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,   
  code VARCHAR(50) UNIQUE NOT NULL,  
  description TEXT,                      
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  lecturer_id INT REFERENCES users(id), 
  category_id INT NOT NULL REFERENCES category(id)
);

-- 1. Create a function that forces code to uppercase
CREATE OR REPLACE FUNCTION enforce_uppercase_code()
RETURNS TRIGGER AS $$
BEGIN
  NEW.code := UPPER(NEW.code);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 2. Create a trigger that calls this function before insert or update
CREATE TRIGGER trg_uppercase_code
BEFORE INSERT OR UPDATE ON category
FOR EACH ROW
EXECUTE FUNCTION enforce_uppercase_code();