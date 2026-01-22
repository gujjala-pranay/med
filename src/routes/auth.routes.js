const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// =====================
// Send OTP (fake)
// =====================
router.post("/send-otp", (req, res) => {
    res.json({
        message: "OTP sent successfully",
        otp: "1234"
    });
});

// =====================
// Verify OTP + Save User
// =====================
router.post("/verify-otp", async (req, res) => {
    const { mobile } = req.body;

    // check mobile number
    if (!mobile) {
        return res.status(400).json({
            message: "Mobile number is required"
        });
    }

    try {
        // save user if not already exists
        await pool.query(
            "INSERT INTO users (mobile_number) VALUES ($1) ON CONFLICT DO NOTHING",
            [mobile]
        );

        res.json({
            message: "Login successful",
            token: "fake-jwt-token"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Database error"
        });
    }
});

module.exports = router;
