import db from "../db.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { FieldValue } from "firebase-admin/firestore";

// Firestore collection for patients
const patientsCollection = db.collection("patients");

// ==================== Signup Patient ====================
export const signupPatient = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const existing = await patientsCollection.where("email", "==", email).get();
    if (!existing.empty) {
      return res.status(400).json({ error: "Patient already registered" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newPatient = {
      name,
      email,
      password: hashedPassword,
      otp: null,
      role: "patient",
      createdAt: FieldValue.serverTimestamp(),
    };

    await patientsCollection.add(newPatient);

    res.status(201).json({ message: "✅ Patient registered successfully!" });
  } catch (err) {
    console.error(" Error registering patient:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ==================== Login Patient (Step 1: Password check + Send OTP) ====================
export const loginPatient = async (req, res) => {
  try {
    const { email, password } = req.body;

    const patientSnap = await patientsCollection.where("email", "==", email).limit(1).get();
    if (patientSnap.empty) {
      return res.status(401).json({ error: "User not found" });
    }

    const patientDoc = patientSnap.docs[0];
    const patient = { id: patientDoc.id, ...patientDoc.data() };

    const isMatch = bcrypt.compareSync(password, patient.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP temporarily in Firestore
    await patientsCollection.doc(patient.id).update({ otp });

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
      subject: "Your Neurochat Login OTP",
      text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
    });

    res.json({
      message: " Password correct, OTP sent to email",
      userId: patient.id,
    });
  } catch (err) {
    console.error(" Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ==================== Verify OTP (Step 2: Confirm login) ====================
export const verifyPatientOTP = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    const patientDoc = await patientsCollection.doc(userId).get();
    if (!patientDoc.exists) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const patient = patientDoc.data();

    if (patient.otp !== otp) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    // Clear OTP after verification
    await patientsCollection.doc(userId).update({ otp: null });

    res.json({
      message: " OTP verified, login successful",
      user: {
        id: userId,
        email: patient.email,
        role: patient.role || "patient",
      },
    });
  } catch (err) {
    console.error(" OTP verification error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ==================== Resend Patient OTP ====================
export const resendPatientOTP = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const patientDoc = await patientsCollection.doc(userId).get();
    if (!patientDoc.exists) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const patient = patientDoc.data();
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();

    await patientsCollection.doc(userId).update({ otp: newOtp });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Neurochat" <${process.env.EMAIL_USER}>`,
      to: patient.email,
      subject: "Resent Neurochat OTP",
      text: `Your new OTP is ${newOtp}.`,
    });

    res.json({ message: "📧 New OTP resent to email." });
  } catch (err) {
    console.error(" Resend OTP error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
