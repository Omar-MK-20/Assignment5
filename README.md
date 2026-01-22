# Assignment 5 - MySQL Database Management

## Overview

This project is Assignment 5 for the MySQL course, covering database design and management using MySQL with Node.js. The assignment consists of three main parts:


1. **Part 1**: ERD (Entity Relationship Diagram) design for Musicana records database
2. **Part 2**: Database schema design and mapping
3. **Part 3**: SQL queries implementation using Node.js and MySQL for a retail store management system
4. **Bonus**: LeetCode problem solution

You can try Express endpoints through this [Postman Documentation](https://documenter.getpostman.com/view/40585195/2sBXVkA99o)

## Project Structure

```
Assignment5/
├── Part1 Musicana records.drawio         # Part 1: ERD diagram source file
├── Part1 Musicana records.drawio.png     # Part 1: ERD diagram export
├── Part2 Schema.drawio                   # Part 2: Schema design source file
├── Part2 Schema.drawio.png               # Part 2: Schema design export
├── main.js                               # Part 3: Node.js SQL queries implementation
├── Part3 SQL Queries.sql                 # Part 3: SQL queries in pure SQL format
├── bonus.sql                             # Bonus: LeetCode solution
├── src/                                  # Express.js application directory
│   ├── main.js                           # Application entry point
│   ├── app.bootstrap.js                  # Express server configuration
│   ├── DBConnection.js                   # MySQL database connection
│   ├── Modules/
│   │   ├── Auth/                         # Authentication module
│   │   │   ├── auth.controller.js        # Queries 14, 15, 16
│   │   │   └── auth.service.js
│   │   └── Retail/                       # Retail module
│   │       ├── retail.controller.js      # Queries from 1 : 13
│   │       └── retail.service.js
│   └── util/
│       └── ResponseError.js              # Custom error handling utility
├── package.json                          # Project dependencies and scripts
├── package-lock.json                     # Dependency lock file
├── .gitignore                            # Git ignore patterns
└── README.md                             # This file
```

## File Descriptions

### Part 1: ERD Diagram

**Part1 Musicana records.drawio**
- Draw.io source file containing the Entity Relationship Diagram for Musicana records database
- Defines entities: Musicians, Instruments, Albums, Songs, and their relationships
- Can be edited using Draw.io (diagrams.net)

**Part1 Musicana records.drawio.png**
- PNG export of the ERD diagram
- Visual representation showing:
  - Musicians (ID, name, address, phone)
  - Instruments (name, musical key)
  - Albums (title, copyright date, album identifier)
  - Songs (title, author)
  - Relationships: many-to-many between musicians and instruments, one-to-many between albums and songs, etc.

### Part 2: Schema Design

**Part2 Schema.drawio**
- Draw.io source file containing the database schema design
- Maps the ERD to actual database schema structure
- Can be edited using Draw.io (diagrams.net)

**Part2 Schema.drawio.png**
- PNG export of the database schema mapping
- Shows table structures, primary keys, foreign keys, and relationships

### Part 3: SQL Queries Implementation

**main.js** (Root)
- Node.js implementation containing all 16 SQL query functions
- Implements the retail store database management system
- Contains functions for:
  1. Creating tables (Suppliers, Products, Sales)
  2. Adding/removing columns (Category column operations)
  3. Modifying column types (ContactNumber to VARCHAR(15))
  4. Adding constraints (NOT NULL to ProductName)
  5. Basic CRUD operations (INSERT, UPDATE, DELETE)
  6. Complex queries (aggregations, joins, filtering)
  7. User management (CREATE USER, GRANT, REVOKE permissions)
- Uses `mysql2/promise` for async database operations
- Each function is commented and can be executed independently

**Part3 SQL Queries.sql**
- Pure SQL script file containing all queries
- Can be executed directly in MySQL client or workbench
- Includes:
  - Database and table creation statements
  - ALTER TABLE operations
  - INSERT, UPDATE, DELETE statements
  - SELECT queries with JOINs and aggregations
  - User permission management statements
- Useful for quick reference and direct database execution

**src/main.js**
- Entry point for the Express.js application
- Bootstraps the application by calling the bootstrap function

**src/app.bootstrap.js**
- Express server configuration and setup
- Defines routes for `/retail` and `/auth` modules
- Implements error handling middleware
- Sets up JSON parsing middleware
- Starts server on port 3000

**src/DBConnection.js**
- MySQL database connection configuration
- Creates and exports a connection pool to the `assignment5` database
- Handles connection errors and exits process on failure
- Database configuration:
  - Host: localhost
  - User: root
  - Database: assignment5

**src/Modules/Retail/**
- Retail module for handling retail store operations
- `retail.controller.js`: Express routes and request handling
- `retail.service.js`: Business logic for retail operations

**src/Modules/Auth/**
- Authentication module for user authentication
- `auth.controller.js`: Express routes for authentication endpoints
- `auth.service.js`: Authentication business logic

**src/util/ResponseError.js**
- Custom error class for handling API errors
- Used by error handling middleware in the Express application

### Bonus (2 Grades)

**bonus.sql**
- Contains the LeetCode solution for "Customer Who Visited but Did Not Make Any Transactions"
- Includes:
  - The solution query using LEFT JOIN to find customers with visits but no transactions
  - Database setup scripts (CREATE DATABASE, CREATE TABLE)
  - Sample data insertion statements
  - Test queries

### Configuration Files

**package.json**
- Project metadata and dependencies
- Dependencies:
  - `express`: ^5.2.1 - Web framework for Node.js
  - `mysql2`: ^3.16.0 - MySQL client for Node.js with Promise support
- Scripts:
  - `start`: Runs the application with watch mode (`node --watch ./src/main.js`)
- Type: ES Module (`"type": "module"`)

**package-lock.json**
- Lock file for npm dependencies
- Ensures consistent dependency versions across installations

**.gitignore**
- Git ignore patterns
- Typically excludes `node_modules/` and other build artifacts

## Database Requirements

### Part 3 Database Schema

The retail store database consists of three main tables:

1. **Suppliers Table**
   - `supplier_id`: INT, PRIMARY KEY, AUTO_INCREMENT
   - `supplier_name`: VARCHAR(50)
   - `contact_number`: VARCHAR(15)

2. **Products Table**
   - `product_id`: INT, PRIMARY KEY, AUTO_INCREMENT
   - `product_name`: VARCHAR(100), NOT NULL
   - `price`: DECIMAL
   - `stock_quantity`: INT
   - `supplier_id`: INT, FOREIGN KEY → Suppliers(supplier_id)

3. **Sales Table**
   - `sales_id`: INT, PRIMARY KEY, AUTO_INCREMENT
   - `product_id`: INT, FOREIGN KEY → Products(product_id)
   - `quantity_sold`: INT
   - `sale_date`: DATE, DEFAULT(CURRENT_TIMESTAMP)

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MySQL Server (v5.7 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Assignment5
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure database connection:
   - Update database credentials in `main.js` and `src/DBConnection.js`:
     ```javascript
     const DBConfig = {
         host: "localhost",
         user: "root",
         password: "your_password",
         database: "assignment5"
     };
     ```

4. Create the database:
   - Run MySQL and execute:
     ```sql
     CREATE DATABASE assignment5;
     ```

### Running the Application

#### Option 1: Execute SQL Queries via Node.js
1. Open `main.js` in the root directory
2. Uncomment the function call you want to execute (e.g., `await createTables();`)
3. Run the file:
   ```bash
   node main.js
   ```

#### Option 2: Execute SQL Script Directly
1. Open `Part3 SQL Queries.sql` in MySQL Workbench or command line
2. Execute the entire script or individual queries

#### Option 3: Run Express Server
1. Start the Express application:
   ```bash
   npm start
   ```
2. Server will run on `http://localhost:3000`
3. Endpoints in this [Postman Documentation](https://documenter.getpostman.com/view/40585195/2sBXVkA99o)

## Assignment Tasks Completed

### Part 1 (1 Grade)
- ✅ ERD diagram for Musicana records database

### Part 2 (1 Grade)
- ✅ Database schema design and mapping

### Part 3 (8 Grades)
- ✅ Task 1: Create required tables (0.5)
- ✅ Task 2: Add "Category" column (0.5)
- ✅ Task 3: Remove "Category" column (0.5)
- ✅ Task 4: Change ContactNumber to VARCHAR(15) (0.5)
- ✅ Task 5: Add NOT NULL constraint to ProductName (0.5)
- ✅ Task 6: Basic inserts (supplier, products, sales) (0.5)
- ✅ Task 7: Update Bread price (0.5)
- ✅ Task 8: Delete Eggs product (0.5)
- ✅ Task 9: Total quantity sold per product (0.5)
- ✅ Task 10: Product with highest stock (0.5)
- ✅ Task 11: Suppliers starting with 'F' (0.5)
- ✅ Task 12: Products never sold (0.5)
- ✅ Task 13: Sales with product names and dates (0.5)
- ✅ Task 14: Create user with permissions (0.5)
- ✅ Task 15: Revoke UPDATE permission (0.5)
- ✅ Task 16: Grant DELETE on Sales table (0.5)

### Bonus (2 Grades)
- ✅ LeetCode solution: "Customer Who Visited but Did Not Make Any Transactions"

## Notes

- All SQL queries are implemented in both Node.js (`main.js`) and pure SQL (`Part3 SQL Queries.sql`) formats
- The Express.js application in `src/` provides a RESTful API structure for the retail store operations
- Database connection credentials should be updated according to your local MySQL setup
- The `main.js` file contains all query functions commented out by default - uncomment the desired function to execute it

## Author

Omar-MK-20
