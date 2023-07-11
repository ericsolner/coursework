CREATE DATABASE student_db;

use student_db;

CREATE TABLE student (
    id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    grade INTEGER(4) NOT NULL,
    PRIMARY KEY(id)
);