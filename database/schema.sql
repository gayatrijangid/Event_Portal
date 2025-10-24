-- Create database
CREATE DATABASE IF NOT EXISTS event_portal;
USE event_portal;

-- Admin table (stores users with different roles: admin, faculty, student)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'faculty', 'student') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    event_date DATE NOT NULL,
    deadline DATE NOT NULL,
    link VARCHAR(500),
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Registration table (students registering for events)
CREATE TABLE IF NOT EXISTS registration (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    student_name VARCHAR(255) NOT NULL,
    event_id INT NOT NULL,
    proof_image VARCHAR(500),
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    UNIQUE KEY unique_registration (email, event_id)
);

-- Insert default admin account (password: admin123)
INSERT INTO admin (name, email, password, role) 
VALUES ('Admin User', 'admin@svkm.ac.in', '$2y$10$eImiTXuWVxfM37uY4JANjQd3eWb7aA5Jr9Kx9Qh8s5K7v0Lm1nQeK
', 'admin')
ON DUPLICATE KEY UPDATE email=email;
