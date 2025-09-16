import db from "../db.js";
import bcrypt from "bcryptjs";

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

// Login patient
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

    res.json({ message: " Login successful", user: patient });
  });
};
