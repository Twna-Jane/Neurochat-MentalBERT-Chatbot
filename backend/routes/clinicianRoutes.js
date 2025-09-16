import express from "express";
import { signupClinician, loginClinician } from "../controllers/clinicianController.js";

const router = express.Router();

router.post("/signup", signupClinician);
router.post("/login", loginClinician);

export default router;
