const express = require("express");
const router = express.Router();
const pool = require("../config/db");

/* =========================
   MOBILE OTP LOGIN
   ========================= */

/**
 * SEND OTP
 * POST /api/auth/mobile/send-otp
 */
router.post("/mobile/send-otp", async (req, res) => {
    const { mobile } = req.body;

    if (!mobile) {
        return res.status(400).json({ message: "Mobile number required" });
    }

    // Mock OTP (replace later with SMS)
    const otp = "1234";

    res.json({
        message: "OTP sent successfully",
        otp
    });
});

/**
 * VERIFY OTP (LOGIN / AUTO REGISTER)
 * POST /api/auth/mobile/verify-otp
 */
router.post("/mobile/verify-otp", async (req, res) => {
    const { mobile, otp } = req.body;

    if (!mobile || !otp) {
        return res.status(400).json({ message: "Mobile and OTP required" });
    }

    if (otp !== "1234") {
        return res.status(401).json({ message: "Invalid OTP" });
    }

    // Check if user exists
    const existingUser = await pool.query(
        "SELECT * FROM users WHERE mobile = $1",
        [mobile]
    );

    let user;

    if (existingUser.rows.length === 0) {
        // Auto register
        const result = await pool.query(
            "INSERT INTO users (mobile) VALUES ($1) RETURNING id, mobile",
            [mobile]
        );
        user = result.rows[0];
    } else {
        user = existingUser.rows[0];
    }

    res.json({
        message: "Login successful (mobile)",
        user
    });
});

/* =========================
   EMAIL REGISTER
   ========================= */

/**
 * REGISTER WITH EMAIL
 * POST /api/auth/email/register
 */
router.post("/email/register", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
    }

    const existingUser = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );

    if (existingUser.rows.length > 0) {
        return res.status(409).json({ message: "Email already registered" });
    }

    const result = await pool.query(
        "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
        [email, password]
    );

    res.status(201).json({
        message: "Registration successful",
        user: result.rows[0]
    });
});

/* =========================
   EMAIL LOGIN
   ========================= */

/**
 * LOGIN WITH EMAIL
 * POST /api/auth/email/login
 */
router.post("/email/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
    }

    const userCheck = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );

    if (userCheck.rows.length === 0) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = userCheck.rows[0];

    if (user.password !== password) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
        message: "Login successful (email)",
        user: {
            id: user.id,
            email: user.email
        }
    });
});

module.exports = router;
