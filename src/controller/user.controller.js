//update user Profile
import { CustomError } from "../middleware/index.js";
import { Post } from "../models/post.js";
import { User } from "../models/user.js";
import { uploadFile } from "../utils/index.js";

// Update Users Profile
export const updateProfile = async (req, res) => {
  console.log("update profile");
  if (!req.body) {
    throw new CustomError("Please provide data to update!", 400);
  }

  const file = req.body.file;
  let objForUpdate = {};

  if (file) {
    let base64Image = file.split(";base64,").pop();
    const buffer = Buffer.from(base64Image, "base64");
    const fileKey = await uploadFile(buffer);
    req.body.profilePic = fileKey;
    if (fileKey) objForUpdate.profilePic = fileKey;
  }

  if (req.body.firstName) objForUpdate.firstName = req.body.firstName;
  if (req.body.lastName) objForUpdate.lastName = req.body.lastName;
  if (req.body.businessName) objForUpdate.businessName = req.body.businessName;
  if (req.body.city) objForUpdate.city = req.body.city;
  if (req.body.country) objForUpdate.country = req.body.country;
  if (req.body.businessWebsites)
    objForUpdate.businessWebsites = req.body.businessWebsites;
  if (req.body.ecommercePlatform) objForUpdate.ecommercePlatform = req.body.ecommercePlatform;
  if (req.body.businessCategory) objForUpdate.businessCategory = req.body.businessCategory;
  if (req.body.productCategory) objForUpdate.productCategory = req.body.productCategory;
  if (req.body.description) objForUpdate.description = req.body.description;
  if (req.body.phoneNo) objForUpdate.phoneNo = req.body.phoneNo;
  if (req.body.website) objForUpdate.website = req.body.website;
  if (req.body.interestingCategories) objForUpdate.interestingCategories = req.body.interestingCategories;
  if (req.body.facebookLink) objForUpdate.facebookLink = req.body.facebookLink;
  if (req.body.linkedinLink) objForUpdate.linkedinLink = req.body.linkedinLink;
  if (req.body.otherProfessionalLinks) objForUpdate.otherProfessionalLinks = req.body.otherProfessionalLinks;
  if (req.body.upworkLink) objForUpdate.upworkLink = req.body.upworkLink;
  if (req.body.toolsUsed) objForUpdate.toolsUsed = req.body.toolsUsed;
  if (req.body.affiliatedAgency) objForUpdate.affiliatedAgency = req.body.affiliatedAgency;

  const user = await User.findByIdAndUpdate(req.user._id, objForUpdate, {
    new: true,
  }).select(["-otpverification", "-password"]);

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    user,
  });
};

// user Data
export const UserData = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findOne({ _id: userId }).select([
    "-password",
    "-bookmarks",
    "-otpverification",
  ]);

  if (!user) {
    throw new CustomError("User Not Found", 404);
  }
  res.status(200).json({
    success: true,
    message: "User Data retrieved successfully",
    user,
  });
};

export const userCount = async (req, res) => {
  const user = await User.find({
    accountType: req.params.role,
    isVerified: true,
  }).select(["-password", "-bookmarks", "-otpverification"]);

  res.status(200).json({
    success: true,
    message: "User Data retrieved successfully",
    user,
    count: user?.length,
  });
};

export const allUser = async (req, res) => {
  const response = await User.find({}).sort({ updatedAt: -1 });
  if (response) {
    res.status(200).json({ status: "success", response });
  } else {
    res.status(400).json({ status: "failed", response: [] });
  }
};

export const deleteUser = async (req, res) => {
  const postRemove = await Post.remove({ author: req?.body?.userId });

  const response = await User.remove({ _id: req?.body?.userId });
  if (response?.acknowledged) {
    res.status(200).json({
      status: "success",
      response: true,
      message: "User delete SuccessFully",
    });
  } else {
    res
      .status(400)
      .json({ status: "failed", response: false, message: "User Not Deleted" });
  }
};

export const handleUserSearch = async (req, res) => {
  const limit = req.query.limit || 30;
  const page = req.query.page || 1;
  const startIndex = Math.max(Number(limit) * (Number(page) - 1), 0);
  const { text } = req.params;

  const totalDocuments = await Post.countDocuments({
    $or: [
      { firstName: { $regex: new RegExp(`${text}`, "mgi") } },
      { lastName: { $regex: new RegExp(`${text}`, "mgi") } },
    ],
  });

  const totalPages = Math.ceil(totalDocuments / limit);

  const response = await User.find(
    {
      $or: [
        { firstName: { $regex: new RegExp(`${text}`, "mgi") } },
        { lastName: { $regex: new RegExp(`${text}`, "mgi") } },
      ],
    },
    { password: 0, otpverification: 0 }
  )
    .skip(startIndex)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  if (response) {
    let data = {
      totalPages,
      currentPage: page,
      response,
    };
    return res.status(200).json({
      message: "Get All Users According To Search",
      data,
      status: "success",
    });
  } else {
    return res.status(400).json({
      message: "Failed to Get All Users According To Search",
      data: null,
      status: "failed",
    });
  }
};

export const createRating = async (req, res) => {
  const { userID, ratingID, ratingValue } = req.body;

  await User.updateOne(
    { _id: ratingID },
    { $pull: { ratingStart: { userID } } }
  );

  const response = await User.updateOne(
    { _id: ratingID },
    {
      $addToSet: {
        ratingStart: {
          $each: [{ userID, ratingValue }],
          $elemMatch: { userID },
        },
      },
    }
  );
  if (response) {
    const allRating = await User.findOne(
      { _id: ratingID },
      { ratingStart: 1, _id: 0 }
    );
    if (allRating) {
      const totalUser = allRating?.ratingStart?.length;
      const totalScores = allRating?.ratingStart?.reduce(
        (previousScore, currentScore, index) =>
          previousScore + currentScore?.ratingValue,
        0
      );
      const response = await User.findByIdAndUpdate(
        { _id: ratingID },
        { ratingStartValue: totalScores / totalUser }
      );

      if (response) {
        return res.status(200).json({
          message: "Rating Update Successfully",
          status: "success",
          rating: totalScores / totalUser,
        });
      } else {
        return res.status(200).json({
          message: "Rating Update Failed",
          status: "failed",
          rating: null,
        });
      }
    } else {
      return res.status(200).json({
        message: "Rating Update Failed",
        status: "failed",
        rating: null,
      });
    }
  }
};

export const identifyDocument = async (req, res) => {
  const { file } = req.body;
  let docs_for_identify = "";

  if (!file) {
    throw new CustomError("Please Provide Documents to Verify!", 400);
  }

  if (file) {
    let base64Image = file.split(";base64,").pop();
    const buffer = Buffer.from(base64Image, "base64");
    const fileKey = await uploadFile(buffer);
    req.body.profilePic = fileKey;
    if (fileKey) docs_for_identify = fileKey;
  }

  const response = await User.findOneAndUpdate(
    { _id: req.user._id },
    {
      docs_for_identify,
      identified_docs_status: false,
      request_to_identify_docs: true,
    }
  );
  if (response) {
    return res
      .status(200)
      .json({ message: "Your Request Send to Admin", status: true });
  } else {
    return res
      .status(200)
      .json({ message: "Your Request Send to Admin", status: true });
  }
};

export const getAllRequestForIdentify = async (req, res) => {
  const response = await User.find({ request_to_identify_docs: true });
  if (response) {
    res.status(200).json({
      message: "Get All Request for Identification",
      status: true,
      data: response,
    });
  } else {
    res.status(400).json({
      message: "Failed to Get All Request for Identification",
      status: false,
      data: [],
    });
  }
};

export const approveRequestForIdentify = async (req, res) => {
  const { id } = req.body;
  const response = await User.findOneAndUpdate(
    { _id: id },
    {
      request_to_identify_docs: false,
      identified_docs_status: false,
    }
  );
  if (response) {
    res.status(200).json({
      message: "Identification Request of User Approve",
      status: true,
      data: response,
    });
  } else {
    res.status(400).json({
      message: "Identification Request of User to Approve Failed",
      status: false,
      data: null,
    });
  }
};
