// routes/passwordRoutes.js
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import db from "../db.js";

const router = express.Router();

// Request Password Reset
router.post("/request-reset", (req, res) => {
  const { email, role } = req.body; // role = patient | clinician | admin

  if (!email || !role) {
    return res.status(400).json({ message: "Email and role are required" });
  }

  
  let table = "";
  if (role === "patient") table = "patients";
  else if (role === "clinician") table = "clinicians";
  else if (role === "admin") table = "admins";
  else return res.status(400).json({ message: "Invalid role" });

  db.query(`SELECT * FROM ${table} WHERE email = ?`, [email], async (err, result) => {
    if (err) return res.status(500).json({ message: "DB error" });
    if (result.length === 0) return res.status(404).json({ message: "User not found" });

    const user = result[0];

    // Generate reset token valid for 1h
    const token = jwt.sign({ id: user.id, role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    const resetURL = `${process.env.CLIENT_URL}/reset-password/${token}`;

    // Email transport
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
        subject: "Password Reset Request",
        html: `
          <p>Hello,</p>
          <p>Click <a href="${resetURL}">here</a> to reset your password.</p>
          <p>This link expires in 1 hour.</p>
        `,
      });

      res.json({ message: "Password reset link sent to email" });
    } catch (mailErr) {
      console.error("Email error:", mailErr);
      res.status(500).json({ message: "Error sending email" });
    }
  });
});

// Reset Password
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hashedPassword = await bcrypt.hash(password, 10);

    let table = "";
    if (decoded.role === "patient") table = "patients";
    else if (decoded.role === "clinician") table = "clinicians";
    else if (decoded.role === "admin") table = "admins";

    db.query(
      `UPDATE ${table} SET password = ? WHERE id = ?`,
      [hashedPassword, decoded.id],
      (err) => {
        if (err) return res.status(500).json({ message: "DB error" });
        res.json({ message: "Password reset successful" });
      }
    );
  } catch (err) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
});

export default router;
