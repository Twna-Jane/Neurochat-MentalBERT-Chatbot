import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import patientRoutes from "./routes/patientRoutes.js";
import clinicianRoutes from "./routes/clinicianRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import passwordRoutes from "./routes/passwordRoutes.js";



dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/patients", patientRoutes);
app.use("/api/clinicians", clinicianRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/password", passwordRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));
