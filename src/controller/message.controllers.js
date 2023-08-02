import { messageModal } from "../models/index.js";
export const messageHandler = async (req, res) => {
  const { conversationId, senderId, text } = req.body;

  if ((!conversationId, !senderId, !text)) {
    throw new CustomError("Please Provide All Fields.");
  }

  const result = await messageModal.create({
    conversationId,
    senderId,
    text,
  });
  if (result) {
    return res.status(200).json({
      message: "Message Created successfully",
      success: true,
      data: result,
    });
  } else {
    return res
      .status(401)
      .json({ message: "Message Created failed", success: false, data: null });
  }
};

export const getMessages = async (req, res) => {
  const { conversationId } = req.body;
  const response = await messageModal.find({ conversationId });
  if (response) {
    return res.status(200).json({
      message: "Get all message Successfully",
      success: true,
      data: response,
    });
  } else {
    return res.status(200).json({
      message: "Get all message Failed",
      success: false,
      data: null,
    });
  }
};
