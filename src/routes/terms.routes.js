import { Router } from "express";
import { termsAndConditions,getTermsConditions } from "../controller/index.js";
import { catchAsync } from "../middleware/index.js";
export const termsRouter = Router();

termsRouter.post("/termsConditions", catchAsync(termsAndConditions));
termsRouter.get("/termsConditions", catchAsync(getTermsConditions));
