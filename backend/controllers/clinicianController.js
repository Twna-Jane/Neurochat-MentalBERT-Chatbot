import db from "../db.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { FieldValue } from "firebase-admin/firestore";

// Firestore collection reference
const cliniciansCollection = db.collection("clinicians");

// ==================== Signup Clinician ====================
export const signupClinician = async (req, res) => {
  try {
    const { name, email, specialty, license, workplace, password } = req.body;

    // Check if email exists
    const existing = await cliniciansCollection.where("email", "==", email).get();
    if (!existing.empty) {
      return res.status(400).json({ error: "Clinician already registered" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newClinician = {
      name,
      email,
      specialty,
      license,
      workplace,
      password: hashedPassword,
      otp: null,
      createdAt: FieldValue.serverTimestamp(),
      role: "clinician"
    };

    await cliniciansCollection.add(newClinician);

    res.status(201).json({ message: "Clinician registered successfully!" });
  } catch (err) {
    console.error("Error registering clinician:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ==================== Login Clinician (Step 1) ====================
export const loginClinician = async (req, res) => {
  try {
    const { email, password } = req.body;

    const clinicianSnap = await cliniciansCollection.where("email", "==", email).limit(1).get();
    if (clinicianSnap.empty) {
      return res.status(401).json({ error: "Clinician not found" });
    }

    const clinicianDoc = clinicianSnap.docs[0];
    const clinician = { id: clinicianDoc.id, ...clinicianDoc.data() };

    const isMatch = bcrypt.compareSync(password, clinician.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP in Firestore
    await cliniciansCollection.doc(clinician.id).update({ otp });

    // Send OTP via email
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
      subject: "Clinician Login OTP",
      text: `Your OTP is ${otp}`,
    });

    res.json({
      message: "OTP sent to email. Please verify.",
      userId: clinician.id,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ==================== Verify Clinician OTP (Step 2) ====================
export const verifyClinicianOTP = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    const clinicianDoc = await cliniciansCollection.doc(userId).get();
    if (!clinicianDoc.exists) {
      return res.status(404).json({ error: "Clinician not found" });
    }

    const clinician = clinicianDoc.data();

    if (clinician.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // Clear OTP
    await cliniciansCollection.doc(userId).update({ otp: null });

    res.json({
      message: " Login successful with 2FA",
      user: {
        id: userId,
        email: clinician.email,
        role: clinician.role || "clinician",
      },
    });
  } catch (err) {
    console.error("OTP verification error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ==================== Resend Clinician OTP ====================
export const resendClinicianOTP = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const clinicianDoc = await cliniciansCollection.doc(userId).get();
    if (!clinicianDoc.exists) {
      return res.status(404).json({ error: "Clinician not found" });
    }

    const clinician = clinicianDoc.data();
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();

    await cliniciansCollection.doc(userId).update({ otp: newOtp });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Neurochat" <${process.env.EMAIL_USER}>`,
      to: clinician.email,
      subject: "Resent Clinician OTP",
      text: `Your new OTP is ${newOtp}`,
    });

    res.json({ message: " New OTP resent to email." });
  } catch (err) {
    console.error("Resend OTP error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
