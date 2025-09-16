import db from "../db.js";
import bcrypt from "bcryptjs";

export const signupAdmin = (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = "INSERT INTO admins (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, hashedPassword], (err, result) => {
    if (err) {
      console.error(" Error inserting admin:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({ message: " Admin registered successfully!" });
  });
};

export const loginAdmin = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM admins WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error(" Login error:", err);
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

    res.json({ message: " Login successful", user: admin });
  });
};
