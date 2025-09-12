import db from "../db.js";
import bcrypt from "bcryptjs";

export const signupClinician = (req, res) => {
  const { name, email, specialty, license, workplace, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = "INSERT INTO clinicians (name, email, specialty, license, workplace, password) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, [name, email, specialty, license, workplace, hashedPassword], (err, result) => {
    if (err) {
      console.error(" Error inserting clinician:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({ message: " Clinician registered successfully!" });
  });
};

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

    res.json({ message: " Login successful", user: clinician });
  });
};
