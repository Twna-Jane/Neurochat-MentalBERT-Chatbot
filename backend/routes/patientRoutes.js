import express from "express";
import { signupPatient, loginPatient, verifyPatientOTP, resendPatientOTP} from "../controllers/patientController.js";

const router = express.Router();

router.post("/signup", signupPatient);
router.post("/login", loginPatient);

router.post("/verify", verifyPatientOTP);
router.post("/resend-otp", resendPatientOTP);

export default router;
