/* Create the initial database and tables */
CREATE DATABASE IF NOT EXISTS bob_ross;
USE bob_ross;
DROP TABLE IF EXISTS paintings;
CREATE TABLE paintings (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  episode VARCHAR(6) NOT NULL,
  title varchar(255) NOT NULL,
  date varchar(50) NOT NULL,
  url varchar(255) NOT NULL,
  img_src varchar(255) NOT NULL,
  painting_index int NOT NULL,
  num_colors int NOT NULL,
  subjects list NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
