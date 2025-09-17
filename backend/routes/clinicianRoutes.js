import express from "express";
import { signupClinician, loginClinician, verifyClinicianOTP, resendClinicianOTP } from "../controllers/clinicianController.js";

const router = express.Router();

router.post("/signup", signupClinician);
router.post("/login", loginClinician);

// OTP verification route (Step 2: verify OTP)
router.post("/verify", verifyClinicianOTP);
router.post("/resend-otp", resendClinicianOTP);


export default router;
