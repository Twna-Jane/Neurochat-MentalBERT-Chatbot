import db from "../db.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

// ==================== Helper: Send OTP Email ====================
const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Neurochat" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Admin Login OTP",
    text: `Your OTP is ${otp}`,
  });
};

// ==================== Signup Admin ====================
export const signupAdmin = (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = "INSERT INTO admins (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, hashedPassword], (err) => {
    if (err) {
      console.error("❌ Error inserting admin:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({ message: "✅ Admin registered successfully!" });
  });
};

// ==================== Login Admin (Step 1: Password Check + Send OTP) ====================
export const loginAdmin = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM admins WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error("❌ Login error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Admin not found" });
    }

    const admin = results[0];
    const isMatch = bcrypt.compareSync(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP temporarily in DB
    const updateOtpSql = "UPDATE admins SET otp = ? WHERE id = ?";
    db.query(updateOtpSql, [otp, admin.id], async (err2) => {
      if (err2) {
        console.error("❌ Error saving OTP:", err2);
        return res.status(500).json({ error: "Database error" });
      }

      try {
        await sendOtpEmail(email, otp);
        res.json({
          message: "📧 OTP sent to email. Please verify.",
          userId: admin.id, // Send back ID for step 2
        });
      } catch (mailErr) {
        console.error("❌ Email error:", mailErr);
        res.status(500).json({ error: "Error sending OTP" });
      }
    });
  });
};

// ==================== Verify Admin OTP (Step 2) ====================
export const verifyAdminOTP = (req, res) => {
  const { userId, otp } = req.body;

  const sql = "SELECT * FROM admins WHERE id = ? AND otp = ?";
  db.query(sql, [userId, otp], (err, results) => {
    if (err) {
      console.error("❌ OTP verification error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // Clear OTP after successful login
    const clearOtpSql = "UPDATE admins SET otp = NULL WHERE id = ?";
    db.query(clearOtpSql, [userId]);

    res.json({ message: "✅ Login successful with 2FA", user: results[0] });
  });
};

// ==================== Resend Admin OTP ====================
export const resendAdminOTP = (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const sql = "SELECT * FROM admins WHERE id = ?";
  db.query(sql, [userId], async (err, results) => {
    if (err) {
      console.error("❌ Resend OTP error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Admin not found" });
    }

    const admin = results[0];
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();

    const updateOtpSql = "UPDATE admins SET otp = ? WHERE id = ?";
    db.query(updateOtpSql, [newOtp, admin.id], async (err2) => {
      if (err2) {
        console.error("❌ Error updating OTP:", err2);
        return res.status(500).json({ error: "Database error" });
      }

      try {
        await sendOtpEmail(admin.email, newOtp);
        res.json({ message: "📧 New OTP resent to email." });
      } catch (mailErr) {
        console.error("❌ Email error:", mailErr);
        res.status(500).json({ error: "Error resending OTP" });
      }
    });
  });
};
