import db from "../db.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

// ==================== Signup Clinician ====================
export const signupClinician = (req, res) => {
  const { name, email, specialty, license, workplace, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql =
    "INSERT INTO clinicians (name, email, specialty, license, workplace, password) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [name, email, specialty, license, workplace, hashedPassword],
    (err, result) => {
      if (err) {
        console.error(" Error inserting clinician:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.status(201).json({ message: " Clinician registered successfully!" });
    }
  );
};

// ==================== Login Clinician (Step 1: Password Check + Send OTP) ====================
export const loginClinician = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM clinicians WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error(" Login error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Clinician not found" });
    }

    const clinician = results[0];
    const isMatch = bcrypt.compareSync(password, clinician.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP in DB temporarily
    const updateOtpSql = "UPDATE clinicians SET otp = ? WHERE id = ?";
    db.query(updateOtpSql, [otp, clinician.id], async (err2) => {
      if (err2) {
        console.error(" Error saving OTP:", err2);
        return res.status(500).json({ error: "Database error" });
      }

      // Send OTP via email
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      try {
        await transporter.sendMail({
          from: `"Neurochat" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: "Clinician Login OTP",
          text: `Your OTP is ${otp}`,
        });

        res.json({
          message: "OTP sent to email. Please verify.",
          userId: clinician.id, // required for Step 2
        });
      } catch (mailErr) {
        console.error(" Email error:", mailErr);
        res.status(500).json({ error: "Error sending OTP" });
      }
    });
  });
};

// ==================== Verify Clinician OTP (Step 2) ====================
export const verifyClinicianOTP = (req, res) => {
  const { userId, otp } = req.body;

  const sql = "SELECT * FROM clinicians WHERE id = ? AND otp = ?";
  db.query(sql, [userId, otp], (err, results) => {
    if (err) {
      console.error(" OTP verification error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // Clear OTP once verified
    const clearOtpSql = "UPDATE clinicians SET otp = NULL WHERE id = ?";
    db.query(clearOtpSql, [userId]);

    res.json({ message: "✅ Login successful with 2FA", user: results[0] });
  });
};

// ==================== Resend Clinician OTP ====================
export const resendClinicianOTP = (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const sql = "SELECT * FROM clinicians WHERE id = ?";
  db.query(sql, [userId], async (err, results) => {
    if (err) {
      console.error("❌ Resend OTP error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Clinician not found" });
    }

    const clincian = results[0];
    const newOtp = Math.floor(100000 + Math.random() * 900000).toS

    const updateOtpSql = "UPDATE clinicians SET otp = ? WHERE id = ?";
    db.query(updateOtpSql, [newOtp, clincian.id], async (err2) => {
      if (err2) {
        console.error("❌ Error updating OTP:", err2);
        return res.status(500).json({ error: "Database error" });
      }

      try {
        await sendOtpEmail(clinician.email, newOtp);
        res.json({ message: "📧 New OTP resent to email." });
      } catch (mailErr) {
        console.error("❌ Email error:", mailErr);
        res.status(500).json({ error: "Error resending OTP" });
      }
    });
  });
};

