const format = require('pg-format');
const db = require('../connection');
const { convertTimestampToDate } = require('./utils');  // If you have utility functions for formatting dates

const seed = ({ exhibitionData, userData }) => {
  return db
    .query(`DROP TABLE IF EXISTS exhibitions;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      // Create the users table
      const createUsersTablePromise = db.query(`
        CREATE TABLE users (
          username VARCHAR PRIMARY KEY,
          name VARCHAR NOT NULL,
          avatar_url VARCHAR
        );
      `);

      // Create the exhibitions table
      const createExhibitionsTablePromise = db.query(`
        CREATE TABLE exhibitions (
          exhibition_id SERIAL PRIMARY KEY,
          name VARCHAR NOT NULL,
          description TEXT NOT NULL,
          date DATE NOT NULL,
          location VARCHAR NOT NULL,
          organizer VARCHAR REFERENCES users(username) -- assuming users organize exhibitions
        );
      `);

      return Promise.all([createUsersTablePromise, createExhibitionsTablePromise]);
    })
    .then(() => {
      // Insert users data
      const insertUsersQueryStr = format(
        'INSERT INTO users (username, name, avatar_url) VALUES %L;',
        userData.map(({ username, name, avatar_url }) => [username, name, avatar_url])
      );
      return db.query(insertUsersQueryStr);
    })
    .then(() => {
      // Optionally, format exhibition dates if needed
      const formattedExhibitionData = exhibitionData.map(convertTimestampToDate);

      // Insert exhibition data
      const insertExhibitionsQueryStr = format(
        'INSERT INTO exhibitions (name, description, date, location, organizer) VALUES %L;',
        formattedExhibitionData.map(
          ({ name, description, date, location, organizer }) => [name, description, date, location, organizer]
        )
      );

      return db.query(insertExhibitionsQueryStr);
    })
    .catch((err) => {
      console.error("Error seeding the database:", err);
    });
};

module.exports = seed;
