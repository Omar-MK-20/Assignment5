-- LeetCode solution

SELECT visits.customer_id, COUNT(visits.customer_id) AS count_no_trans
FROM visits
    LEFT JOIN transactions ON visits.visit_id = transactions.visit_id
WHERE
    transactions.transaction_id IS NULL
GROUP BY
    visits.customer_id;

-- ============================

-- Create database
CREATE DATABASE Bonus;

DROP DATABASE Bonus;

USE Bonus;

-- Create Visits table
CREATE TABLE Visits (
    visit_id INT PRIMARY KEY,
    customer_id INT
);

-- Create Transactions table
CREATE TABLE Transactions (
    transaction_id INT PRIMARY KEY,
    visit_id INT,
    amount INT,
    CONSTRAINT fk_transactions_visits
        FOREIGN KEY (visit_id)
        REFERENCES Visits(visit_id)
);


-- ============================

-- Insert data into Visits table
INSERT INTO Visits (visit_id, customer_id) VALUES
(1, 23),
(2, 9),
(4, 30),
(5, 54),
(6, 96),
(7, 54),
(8, 54);

-- Insert data into Transactions table
INSERT INTO Transactions (transaction_id, visit_id, amount) VALUES
(2, 5, 310),
(3, 5, 300),
(9, 5, 200),
(12, 1, 910),
(13, 2, 970);


-- =========================

SELECT * FROM transactions;
SELECT * FROM visits;

-- =========================


