import db from "../db.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

// Signup patient
export const signupPatient = (req, res) => {
  const { name, email, password } = req.body;

  // Hash password
  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = "INSERT INTO patients (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, hashedPassword], (err, result) => {
    if (err) {
      console.error("❌ Error inserting patient:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({ message: "✅ Patient registered successfully!" });
  });
};

// Login patient (Step 1: password check)
export const loginPatient = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM patients WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error(" Login error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    const patient = results[0];
    const isMatch = bcrypt.compareSync(password, patient.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    //Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP temporarily in DB 
    db.query(
      "UPDATE patients SET otp = ? WHERE id = ?",
      [otp, patient.id],
      (err2) => {
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

        transporter.sendMail(
          {
            from: `"Neurochat" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Your Neurochat Login OTP",
            text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
          },
          (mailErr) => {
            if (mailErr) {
              console.error(" OTP email error:", mailErr);
              return res.status(500).json({ error: "Error sending OTP email" });
            }
            res.json({
              message: " Password correct, OTP sent to email",
              userId: patient.id,
            });
          }
        );
      }
    );
  });
};

// Verify OTP (Step 2: confirm login)
export const verifyPatientOTP = (req, res) => {
  const { userId, otp } = req.body;

  db.query("SELECT * FROM patients WHERE id = ? AND otp = ?", [userId, otp], (err, results) => {
    if (err) {
      console.error("❌ OTP verify error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    // Clear OTP after use
    db.query("UPDATE patients SET otp = NULL WHERE id = ?", [userId]);

    res.json({ message: "✅ OTP verified, login successful", 
      user: {
        id: results[0].id,
        email: results[0].email,
        role: results[0].role
      }
    });
  });
};

// ==================== Resend Patient OTP ====================
export const resendPatientOTP = (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const sql = "SELECT * FROM patients WHERE id = ?";
  db.query(sql, [userId], async (err, results) => {
    if (err) {
      console.error("❌ Resend OTP error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const patient = results[0];
   const newOtp = Math.floor(100000 + Math.random() * 900000).toS

    const updateOtpSql = "UPDATE patients SET otp = ? WHERE id = ?";
    db.query(updateOtpSql, [newOtp, patient.id], async (err2) => {
      if (err2) {
        console.error("❌ Error updating OTP:", err2);
        return res.status(500).json({ error: "Database error" });
      }

      try {
        await sendOtpEmail(patient.email, newOtp);
        res.json({ message: "📧 New OTP resent to email." });
      } catch (mailErr) {
        console.error("❌ Email error:", mailErr);
        res.status(500).json({ error: "Error resending OTP" });
      }
    });
  });
};

