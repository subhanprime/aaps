import { Router } from "express";
import { createPrivacyPolicy, getPrivacyPolicy } from "../controller/index.js";
import { catchAsync } from "../middleware/index.js";
export const policyRouter = Router();

policyRouter.post("/privacyPolicy", catchAsync(createPrivacyPolicy));
policyRouter.get("/privacyPolicy", catchAsync(getPrivacyPolicy));
