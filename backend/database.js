// database.js
const sqlite3 = require('sqlite3').verbose();

const path = require('path');
// Render's persistent disk will be mounted at /data.
// We'll use a local file for development.
const dbPath = process.env.NODE_ENV === 'production' 
  ? path.join('/data', 'contacts.db') 
  : 'contacts.db';

const DBSOURCE = dbPath;

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database.');
        // Create the contacts table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            phone TEXT NOT NULL,
            CONSTRAINT email_unique UNIQUE (email)
            )`, (err) => {
            if (err) {
                // Table already created
            } else {
                console.log('Contacts table created or already exists.');
            }
        });
    }
});

module.exports = db;