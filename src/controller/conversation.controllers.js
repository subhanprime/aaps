import { conversationModal } from "../models/index.js";

export const handleConversation = async (req, res) => {
  const { members } = req.body;
  let member = members.filter((el) => el);
  if (!member || member.length != 2) {
    return res
      .status(401)
      .json({ message: "Please Provide Proper data", success: false });
  }
  const result = await conversationModal.find({
    members: { $all: [...member] },
  });
  console.log("result.length", result.length, result);
  if (result.length > 0) {
    return res
      .status(401)
      .json({ message: "conversation already Created", success: false });
  } else {
    const created = await conversationModal.create({ members: member });
    if (created) {
      return res
        .status(201)
        .json({ message: "conversation Created Successfully", success: true });
    } else {
      return res
        .status(401)
        .json({ message: "conversation Created Failed", success: false });
    }
  }
};

export const getAllConversation = async (req, res) => {
  if (!req.user) {
    throw new CustomError("User not authenticated.");
  }
  const result = await conversationModal.find({
    members: { $in: [req.user?.id] },
  });
  return res.status(201).json({
    message: "Get All conversation Successfully",
    success: true,
    data: result,
  });
};
