import { feedbackModal } from "../models/index.js";
export const addFeedBack = async (req, res) => {
  const { userId, feedback, feederId } = req.body;
  if (!userId || !feedback || !feederId) {
    return res.status(400).json({
      message: "Please Provide All Fields",
      status: "failed",
      response: null,
    });
  }
  const response = await feedbackModal.create({
    userId,
    feedback,
    feederId,
  });
  if (response) {
    return res.status(200).json({
      message: "Feedback Add Successfully",
      status: "success",
      response,
    });
  } else {
    return res.status(400).json({
      message: "Feedback Add Successfully",
      status: "success",
      response,
    });
  }
};

export const getFeedback = async (req, res) => {
  const { userId } = req?.params;

  if (!userId)
    return res.status(400).json({
      message: "please provide all Fields",
      status: false,
    });

  const response = await feedbackModal.find({ userId }).sort({ updatedAt: -1 });
  if (response)
    return res.status(200).json({
      message: "Get All FeedBack",
      status: true,
      response,
    });
  else
    return res.status(400).json({
      message: "Please try again There is some went wrong",
      status: false,
    });
};
