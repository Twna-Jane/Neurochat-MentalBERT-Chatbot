import express from "express";
import { signupAdmin, loginAdmin, verifyAdminOTP, resendAdminOTP } from "../controllers/adminController.js";

const router = express.Router();


router.post("/signup", signupAdmin);
router.post("/login", loginAdmin);

// OTP verification route 
router.post("/verify", verifyAdminOTP);
router.post("/resend-otp", resendAdminOTP);

export default router;
