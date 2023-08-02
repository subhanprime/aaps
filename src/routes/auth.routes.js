import { Router } from "express";
import { catchAsync, upload } from "../middleware/index.js";
import {
  register,
  login,
  forgetPassword,
  verificationOTP,
  verificationOTPForSignup,
  changePassword,
  getUser,
  logout,
  changeAppPassword,
} from "../controller/auth.controller.js";
import passport from "passport";
export const authRoutes = Router();

// Register
authRoutes.post("/register", catchAsync(register));

// Login
authRoutes.post("/login", catchAsync(login));

// forgot-password
authRoutes.post("/forgot-password", catchAsync(forgetPassword));

// verification otp
authRoutes.post("/otpVerification", catchAsync(verificationOTP));

// verification otp for signup
authRoutes.post(
  "/otpVerification-signup",
  catchAsync(verificationOTPForSignup)
);

// change-password

authRoutes.post("/change-password", catchAsync(changePassword));
authRoutes.post("/changeAppPassword", catchAsync(changeAppPassword));

// get-user
authRoutes.get(
  "/getUser",
  passport.authenticate("jwt", { session: false }),
  catchAsync(getUser)
);

// logout
authRoutes.post("/logout", catchAsync(logout));
