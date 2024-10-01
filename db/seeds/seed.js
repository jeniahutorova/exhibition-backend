const format = require('pg-format');
const db = require('../../db/connection'); // Make sure this is set up for MySQL
const { fetchData } = require('../../src/api'); // Function to fetch data from API

const seed = async () => {
    try {
        await db.query(`DROP TABLE IF EXISTS exhibitions;`);
        await db.query(`DROP TABLE IF EXISTS objects;`);
        await db.query(`DROP TABLE IF EXISTS departments;`);

        // Create departments table
        await db.query(`
            CREATE TABLE departments (
                department_id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT
            );
        `);

        // Create objects table
        await db.query(`
            CREATE TABLE object (
                object_id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                department_id INT,
                FOREIGN KEY (department_id) REFERENCES departments(department_id) ON DELETE SET NULL
            );
        `);

        // Create exhibitions table
        await db.query(`
            CREATE TABLE exhibitions (
                exhibition_id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                date DATE,
                location VARCHAR(255),
                department_id INT,
                FOREIGN KEY (department_id) REFERENCES departments(department_id) ON DELETE SET NULL
            );
        `);

        // Fetch department data from API
        const departmentDataResponse = await fetchData('departments');
        const departmentData = departmentDataResponse.departments;

        if (!Array.isArray(departmentData) || departmentData.length === 0) {
            throw new Error('No department data found');
        }

        // Insert department data
        const insertDepartmentsQueryStr = format(
            'INSERT INTO departments (name, description) VALUES %L;',
            departmentData.map(({ displayName, departmentDesc }) => [displayName, departmentDesc || ''])
        );

        await db.query(insertDepartmentsQueryStr);

        // Hardcode object data
        const objectsData = await fetchData('objects/[objectID]');
        const objectValues = objectsData.map(({ name, description, department_id }) => [name, description || '', department_id]);


        const insertObjectsQueryStr = format(
            'INSERT INTO objects (name, description, department_id) VALUES %L;',
            objectValues
        );

        // Insert object data
        await db.query(insertObjectsQueryStr);

        // Hardcode exhibition data
        const exhibitionValues = [
            ['Art of History', 'An exhibition featuring historical art.', '2024-12-01', 'Gallery A', 1], // Assuming department_id 1 exists
            ['Modern Expressions', 'An exhibition showcasing modern art.', '2024-12-10', 'Gallery B', 1], // Assuming department_id 1 exists
        ];

        const insertExhibitionsQueryStr = format(
            'INSERT INTO exhibitions (name, description, date, location, department_id) VALUES %L;',
            exhibitionValues
        );

        // Insert exhibition data
        await db.query(insertExhibitionsQueryStr);

        console.log("Data successfully seeded!");
    } catch (err) {
        console.error("Error seeding data:", err);
    }
};

module.exports = seed; // Export the seed function
