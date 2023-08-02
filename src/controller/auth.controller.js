import {
  BadRequest,
  CustomError,
  logIn,
  sendOptMailForResetPass,
  sendVerificationMailForSignUp,
  upload,
} from "../middleware/index.js";
import bcrypt from "bcryptjs";
import otpGenerator from "otp-generator";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import { uploadFile } from "../utils/aws.js";
const { APP_SECRET } = process.env;

// Register
export const register = async (req, res) => {
  const { firstName, lastName, email, password, accountType } = req.body;
  if (!firstName || !email || !password || !accountType || !lastName) {
    throw new BadRequest("Please enter all the required data");
  }

  const checkUser = await User.findOne({ email });

  if (checkUser) {
    throw new CustomError("Email Already in use", 409);
  }
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
    digits: true,
  });
  const timestamp = Date.now() + 900000; //15 minutes

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    accountType,
    otpverification: { otp, expiry: new Date(timestamp) },
  });

  // const token = await logIn({ _id: user?._id });

  await sendVerificationMailForSignUp(email, otp);
  user.password = undefined;

  res.status(201).json({
    success: true,
    message: "Please Check Your Email For Confirmation.",
    // token,
    // user,
  });
};

// verification otp for sign up
export const verificationOTPForSignup = async (req, res) => {
  const { otp } = req.body;

  const findUser = await User.findOne({ "otpverification.otp": otp });
  if (!findUser) {
    throw new CustomError("OTP is wrong", 404);
  }
  const currentTimestamp = Date.now();
  if (findUser?.otpverification.expiry < currentTimestamp) {
    throw new CustomError("OTP Expired", 403);
  }

  const user = await User.findByIdAndUpdate(
    { _id: findUser?._id },
    { otpverification: { otp: "", expiry: "" }, isVerified: true },
    { new: true }
  );
  const token = await logIn({ _id: user?._id });

  res.status(200).json({
    success: true,
    user,
    token,
  });
};

// User LogIn
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("-otpverification  ");
  const timestamp = Date.now() + 900000;
  if (!user || !(await user.matchesPassword(password))) {
    throw new CustomError("Incorrect login  details", 401);
  }
  if (!user.isVerified) {
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
      digits: true,
    });
    const filter = { email: email };
    const update = {
      otpverification: { otp: otp, expiry: new Date(timestamp) },
      isVerified: false,
    };
    const updateOtp = await User.findOneAndUpdate(filter, update);
    await sendVerificationMailForSignUp(email, otp);
    return res.status(200).json({
      success: true,
      message: "Please Check Your Email For Confirmation.",
      isVerified: false,
      // user: updateOtp
    });
  }
  const token = await logIn({ _id: user?._id });

  user.password = undefined;
  const filteredUser = Object.entries(user.toObject()).reduce(
    (acc, [key, value]) => {
      if (Array.isArray(value) && value.length === 0) {
        return acc;
      }
      return {
        ...acc,
        [key]: value,
      };
    },
    {}
  );

  res.status(200).json({
    success: true,
    message: "Login Successfully!",
    token,
    user: filteredUser,
  });
};

// forgetPassword
export const forgetPassword = async (req, res) => {
  const { email } = req.body;

  const findUser = await User.findOne({ email });
  if (!findUser) {
    throw new CustomError("User Not Found", 404);
  }

  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
    digits: true,
  });

  const timestamp = Date.now() + 900000; //15 minutes

  await User.findByIdAndUpdate(
    { _id: findUser?._id },
    { otpverification: { otp, expiry: new Date(timestamp) } }
  );

  await sendOptMailForResetPass(email, otp);
  res.status(200).json({
    success: true,
    message: "Please Check Your Email For Confirmation",
  });
};

// verification otp
export const verificationOTP = async (req, res) => {
  const { otp } = req.body;

  const findUser = await User.findOne({ "otpverification.otp": otp });
  if (!findUser) {
    throw new CustomError("OTP is wrong", 404);
  }
  const currentTimestamp = Date.now();
  if (findUser?.otpverification.expiry < currentTimestamp) {
    throw new CustomError("OTP Expired", 403);
  }

  const token = jwt.sign(findUser?._id?.toString(), APP_SECRET);

  await User.findByIdAndUpdate(
    { _id: findUser?._id },
    { otpverification: { otp: "", expiry: "" } }
  );

  res.status(200).json({
    success: true,
    token,
  });
};

//changePassword
export const changePassword = async (req, res) => {
  const token = req.headers.authorization;

  const { password } = req.body;
  const userID = jwt.verify(token?.split(" ")[1], APP_SECRET);

  const findUser = await User.findOne({ _id: userID });
  if (!findUser) {
    throw new CustomError("User Not Found", 404);
  }

  await User.findOneAndUpdate(
    { _id: findUser._id },

    {
      password: bcrypt.hashSync(password, 10),
    }
  );

  res.status(201).json({
    success: true,
    message: "Password Changed! Login Again",
  });
};

//get User
export const getUser = async (req, res) => {
  if (!req.user) {
    throw new CustomError("User not authenticated.");
  }

  res.setHeader("content-type", "application/json");
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

//Logout User
export const logout = async (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(new CustomError(err.message, err.statusCode));
    }
    res.status(200).json({
      success: "Logged out Successfully",
    });
  });
};

export const changeAppPassword = async (req, res) => {
  const token = req.headers.authorization;
  const userID = jwt.verify(token?.split(" ")[1], APP_SECRET);
  const { oldPassword, newPassword } = req.body;
  const findUser = await User.findOne(
    { _id: userID },
    { password: 1, firstName: 1, email: 1 }
  );

  if (!findUser) {
    throw new CustomError("User Not Found", 404);
  }

  const isMatched = await findUser.matchesPassword(oldPassword);

  if (isMatched) {
    const updatePassword = await User.findOneAndUpdate(
      { _id: userID },
      {
        password: bcrypt.hashSync(newPassword, 10),
      }
    );

    if (updatePassword) {
      return res.status(201).json({
        success: true,
        message: "Password Changed! Login Again",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Password Not Changed",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "User Password Not Matched",
    });
  }
};
