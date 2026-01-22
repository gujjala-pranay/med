const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Add family member
router.post("/", async (req, res) => {
    const { user_mobile, name, relation, age } = req.body;

    if (!user_mobile || !name) {
        return res.status(400).json({ message: "user_mobile and name required" });
    }

    try {
        await pool.query(
            "INSERT INTO family_members (user_mobile, name, relation, age) VALUES ($1, $2, $3, $4)",
            [user_mobile, name, relation, age]
        );

        res.json({ message: "Family member added" });
    } catch (err) {
        res.status(500).json({ message: "Database error" });
    }
});

// List family members
router.get("/:user_mobile", async (req, res) => {
    const { user_mobile } = req.params;

    try {
        const result = await pool.query(
            "SELECT * FROM family_members WHERE user_mobile = $1 ORDER BY id ASC",
            [user_mobile]
        );

        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: "Database error" });
    }
});

module.exports = router;
