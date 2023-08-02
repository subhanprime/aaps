import { handleConversation, getAllConversation } from "../controller/index.js";
import { catchAsync } from "../middleware/handleErrors.js";
import { Router } from "express";
import passport from "passport";

export const conversationRoute = Router();

conversationRoute.post("/conversation", handleConversation);
conversationRoute.get(
  "/conversation",
  passport.authenticate("jwt", { session: false }),
  catchAsync(getAllConversation)
);
