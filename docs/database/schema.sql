DROP TABLE IF EXISTS job_offer_technology;
DROP TABLE IF EXISTS job_offer;
DROP TABLE IF EXISTS technology;
DROP TABLE IF EXISTS company;

CREATE TABLE company (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo VARCHAR(255),
    description TEXT
);

CREATE TABLE technology (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE job_offer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    city VARCHAR(255) NOT NULL,
    contract_type VARCHAR(100) NOT NULL,
    publish_date DATE NOT NULL,
    company_id INT NOT NULL,
    FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE
);

CREATE TABLE job_offer_technology (
    job_offer_id INT NOT NULL,
    technology_id INT NOT NULL,
    PRIMARY KEY (job_offer_id, technology_id),
    FOREIGN KEY (job_offer_id) REFERENCES job_offer(id) ON DELETE CASCADE,
    FOREIGN KEY (technology_id) REFERENCES technology(id) ON DELETE CASCADE
);