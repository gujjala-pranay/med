const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const AWS = require("aws-sdk");

// AWS S3 setup
AWS.config.update({ region: process.env.AWS_REGION });
const s3 = new AWS.S3();

/**
 * ADD PRESCRIPTION
 * POST /api/prescriptions/add
 */
router.post("/add", async (req, res) => {
    const { user_mobile, family_member_id, file_key, title, notes } = req.body;

    if (!user_mobile || !family_member_id || !file_key) {
        return res.status(400).json({
            message: "user_mobile, family_member_id, and file_key are required"
        });
    }

    try {
        const result = await pool.query(
            `INSERT INTO prescriptions
             (user_mobile, family_member_id, file_key, title, notes)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [user_mobile, family_member_id, file_key, title || null, notes || null]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Database error" });
    }
});

/**
 * BASIC LIST (DB ONLY)
 * GET /api/prescriptions/:family_member_id
 */
router.get("/:family_member_id", async (req, res) => {
    const { family_member_id } = req.params;

    try {
        const result = await pool.query(
            "SELECT * FROM prescriptions WHERE family_member_id = $1 ORDER BY created_at DESC",
            [family_member_id]
        );

        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Database error" });
    }
});

/**
 * DASHBOARD LIST (WITH DOWNLOAD URL)
 * GET /api/prescriptions/dashboard/:family_member_id
 */
router.get("/dashboard/:family_member_id", async (req, res) => {
    const { family_member_id } = req.params;

    try {
        const result = await pool.query(
            "SELECT * FROM prescriptions WHERE family_member_id = $1 ORDER BY created_at DESC",
            [family_member_id]
        );

        const prescriptionsWithUrls = await Promise.all(
            result.rows.map(async (p) => {
                const downloadURL = await s3.getSignedUrlPromise("getObject", {
                    Bucket: process.env.S3_BUCKET_NAME,
                    Key: p.file_key,
                    Expires: 300
                });

                return {
                    ...p,
                    downloadURL
                };
            })
        );

        res.json(prescriptionsWithUrls);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Dashboard fetch failed" });
    }
});

module.exports = router;
