// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./database.js');

const app = express();

// Middleware
app.use(cors()); // Allows requests from our frontend
app.use(express.json()); // Parses incoming JSON requests

// --- API ENDPOINTS ---

// GET /contacts - Fetch paginated contacts
app.get('/api/contacts', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const sql = `SELECT * FROM contacts ORDER BY name LIMIT ? OFFSET ?`;
    const countSql = `SELECT COUNT(*) as count FROM contacts`;

    db.all(sql, [limit, offset], (err, rows) => {
        if (err) {
            return res.status(500).json({ "error": err.message });
        }
        db.get(countSql, [], (err, result) => {
            if (err) {
                return res.status(500).json({ "error": err.message });
            }
            res.json({
                message: "success",
                data: rows,
                totalPages: Math.ceil(result.count / limit),
                currentPage: page,
            });
        });
    });
});

// POST /contacts - Add a new contact
app.post('/api/contacts', (req, res) => {
    const { name, email, phone } = req.body;
    const errors = [];

    // Server-side validation
    if (!name) errors.push("Name is required");
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.push("Valid email is required");
    if (!phone || !/^\d{10}$/.test(phone)) errors.push("10-digit phone number is required");

    if (errors.length) {
        return res.status(400).json({ "error": errors.join(", ") });
    }

    const sql = `INSERT INTO contacts (name, email, phone) VALUES (?,?,?)`;
    const params = [name, email, phone];
    db.run(sql, params, function (err) {
        if (err) {
             // Handle unique constraint violation for email
            if (err.message.includes("UNIQUE constraint failed")) {
                return res.status(400).json({ "error": "Email already exists." });
            }
            return res.status(500).json({ "error": err.message });
        }
        res.status(201).json({
            message: "success",
            data: { id: this.lastID, name, email, phone },
        });
    });
});


// DELETE /contacts/:id - Delete a contact
app.delete('/api/contacts/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM contacts WHERE id = ?`;

    db.run(sql, id, function (err) {
        if (err) {
            return res.status(500).json({ "error": err.message });
        }
        // Check if any row was deleted
        if (this.changes === 0) {
            return res.status(404).json({ "error": `Contact with id ${id} not found.` });
        }
        res.status(200).json({ message: "deleted", changes: this.changes });
    });
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});