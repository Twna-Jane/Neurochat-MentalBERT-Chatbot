// controllers/adminController.js
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
export const signupAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if admin already exists
    const existingAdminSnap = await db.collection("admins")
      .where("email", "==", email)
      .get();

    if (!existingAdminSnap.empty) {
      return res.status(400).json({ error: "Admin already exists" });
    }

    // Hash password and save to Firestore
    const hashedPassword = bcrypt.hashSync(password, 10);

    const newAdmin = {
      name,
      email,
      password: hashedPassword,
      role: "admin",
      createdAt: new Date(),
      otp: null
    };

    const docRef = await db.collection("admins").add(newAdmin);

    res.status(201).json({
      message: " Admin registered successfully!",
      id: docRef.id,
    });
  } catch (err) {
    console.error(" Error inserting admin:", err);
    res.status(500).json({ error: "Failed to create admin" });
  }
};

// ==================== Login Admin (Step 1: Password Check + Send OTP) ====================
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin by email
    const snapshot = await db.collection("admins")
      .where("email", "==", email)
      .get();

    if (snapshot.empty) {
      return res.status(401).json({ error: "Admin not found" });
    }

    const adminDoc = snapshot.docs[0];
    const admin = { id: adminDoc.id, ...adminDoc.data() };

    const isMatch = bcrypt.compareSync(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Update Firestore document with OTP
    await db.collection("admins").doc(admin.id).update({ otp });

    try {
      await sendOtpEmail(email, otp);
      res.json({
        message: "📧 OTP sent to email. Please verify.",
        userId: admin.id,
      });
    } catch (mailErr) {
      console.error(" Email error:", mailErr);
      res.status(500).json({ error: "Error sending OTP" });
    }
  } catch (err) {
    console.error(" Login error:", err);
    res.status(500).json({ error: "Failed to log in" });
  }
};

// ==================== Verify Admin OTP (Step 2) ====================
export const verifyAdminOTP = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    const docRef = db.collection("admins").doc(userId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Admin not found" });
    }

    const admin = doc.data();

    if (admin.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // Clear OTP after successful verification
    await docRef.update({ otp: null });

    res.json({
      message: " Login successful with 2FA",
      user: {
        id: userId,
        email: admin.email,
        role: admin.role || "admin",
      },
    });
  } catch (err) {
    console.error(" OTP verification error:", err);
    res.status(500).json({ error: "Failed to verify OTP" });
  }
};

// ==================== Resend Admin OTP ====================
export const resendAdminOTP = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const docRef = db.collection("admins").doc(userId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Admin not found" });
    }

    const admin = doc.data();
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();

    await docRef.update({ otp: newOtp });

    try {
      await sendOtpEmail(admin.email, newOtp);
      res.json({ message: "📧 New OTP resent to email." });
    } catch (mailErr) {
      console.error(" Email error:", mailErr);
      res.status(500).json({ error: "Error resending OTP" });
    }
  } catch (err) {
    console.error(" Resend OTP error:", err);
    res.status(500).json({ error: "Failed to resend OTP" });
  }
};
