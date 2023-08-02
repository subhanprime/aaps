import { Router } from "express";
import { addFeedBack, getFeedback } from "../controller/index.js";
import { catchAsync } from "../middleware/index.js";
export const feedbackRouter = Router();

feedbackRouter.post("/feedback", catchAsync(addFeedBack));
feedbackRouter.get("/feedback/:userId", catchAsync(getFeedback));
// termsRouter.get("/termsConditions", catchAsync(getTermsConditions));
