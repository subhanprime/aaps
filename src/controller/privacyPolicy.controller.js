import { privacyPolicyModal } from "../models/index.js";
export const createPrivacyPolicy = async (req, res) => {
  const { privacyPolicy } = req.body;
  if (!privacyPolicy)
    return res
      .status(401)
      .json({ message: "please Provide all fields", status: "failed" });
  const response = await privacyPolicyModal.create({
    privacyPolicy,
  });

  if (response) {
    return res.status(200).json({
      message: "Terms and Conditions Updated successfully",
      status: "success",
      data: response,
    });
  } else {
    return res.status(400).json({
      message: "Terms and Conditions not Updated ",
      status: "failed",
      data: null,
    });
  }
};

export const getPrivacyPolicy = async (req, res) => {
  const response = await privacyPolicyModal.find({});
  if (response)
    return res.status(200).json({
      message: "get data successfully",
      status: "success",
      data: response[response.length - 1],
    });
  else
    return res.status(400).json({
      message: "Failed to get Terms and Conditions",
      status: "false",
      data: null,
    });
};
