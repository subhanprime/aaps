import { reportModals, reportUserModal } from "../models/index.js";

export const submitReport = async (req, res) => {
  const { label, heading, description, scammerId, reporterId } = req.body;
  if ((!label || !heading || !description, !scammerId, !reporterId)) {
    return res.status(400).json({
      message: "Please Provide all Fields",
      status: "failed",
      data: false,
    });
  }
  const response = await reportModals.create({
    label,
    heading,
    scammerId,
    reporterId,
    description,
  });
  if (response)
    return res.status(200).json({
      message: "Your Report Submit Successfully",
      status: "success",
      data: response,
    });
  else
    return res.status(200).json({
      message: "Your Report submission Failed",
      status: "failed",
      data: false,
    });
};

export const getallReports = async (req, res) => {
  const response = await reportModals
    .find({})
    .populate("scammerId")
    .populate("reporterId");
  if (response) {
    const reports = response.filter((el) => el.scammerId);
    return res.status(200).json({
      data: reports,
      status: "success",
      message: "fetch data successfully",
    });
  } else
    return res.status(400).json({
      data: [],
      status: "failed",
      message: "try again later",
    });
};

export const deleteReports = async (req, res) => {
  const { listId } = req.body;
  const response = await reportModals.remove({ _id: listId });
  if (response) {
    return res.status(200).json({
      message: "report delete successfully",
      status: "success",
      response,
    });
  } else {
    return res.status(400).json({
      message: "report delete failed",
      status: "failed",
      response: null,
    });
  }
};

// user Reported successfully

export const userReported = async (req, res) => {
  const { label, heading, description, reportedUser, reporterId } = req.body;
  if ((!label || !heading || !description, !reportedUser, !reporterId)) {
    return res.status(400).json({
      message: "Please Provide all Fields",
      status: "failed",
      data: false,
    });
  }
  const response = await reportUserModal.create({
    label,
    heading,
    reportedUser,
    reporterId,
    description,
  });
  if (response)
    return res.status(200).json({
      message: "User Reported Successfully",
      status: "success",
      data: response,
    });
  else
    return res.status(200).json({
      message: "User Reported Failed",
      status: "failed",
      data: false,
    });
};

export const getAllReportedUser = async (req, res) => {
  const response = await reportUserModal
    .find({})
    .populate("reportedUser")
    .populate("reporterId");
  if (response) {
    const reports = response.filter((el) => el.reportedUser);
    return res.status(200).json({
      data: reports,
      status: "success",
      message: "Get All Reported User  Successfully",
    });
  } else
    return res.status(400).json({
      data: [],
      status: "failed",
      message: "Get All Reported User  Failed",
    });
};

export const deleteReportedUser = async (req, res) => {
  const { listId } = req.body;
  const response = await reportUserModal.remove({ _id: listId });
  if (response) {
    return res.status(200).json({
      message: "Reported User delete Successfully",
      status: "success",
      response,
    });
  } else {
    return res.status(400).json({
      message: "Reported User delete Failed",
      status: "failed",
      response: null,
    });
  }
};
