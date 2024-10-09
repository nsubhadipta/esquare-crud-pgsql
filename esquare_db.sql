CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    age INT
);

-- Procedures

-- Insert User
CREATE OR REPLACE PROCEDURE sp_create_user(IN p_name VARCHAR, IN p_email VARCHAR, IN p_age INT)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO users (name, email, age) VALUES (p_name, p_email, p_age);
END;
$$;


-- Update User
CREATE OR REPLACE PROCEDURE sp_update_user(IN p_id INT, IN p_name VARCHAR, IN p_email VARCHAR, IN p_age INT)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE users SET name = p_name, email = p_email, age = p_age WHERE id = p_id;
END;
$$;


-- Function s

-- Get All user
CREATE OR REPLACE FUNCTION get_users()
RETURNS TABLE(id INT, name VARCHAR, email VARCHAR, age INT) AS $$
BEGIN
  RETURN QUERY SELECT * FROM users;
END;
$$ LANGUAGE plpgsql;


-- Delete User
CREATE OR REPLACE FUNCTION delete_user(p_id INT)
RETURNS VOID AS $$
BEGIN
  DELETE FROM users WHERE id = p_id;
END;
$$ LANGUAGE plpgsql;
