import { Router } from "express";
import {
  submitReport,
  getallReports,
  deleteReports,
  userReported,
  getAllReportedUser,
  deleteReportedUser,
} from "../controller/index.js";
import { catchAsync } from "../middleware/index.js";

export const reportRouter = Router();

reportRouter.post("/submitReport", catchAsync(submitReport));
reportRouter.get("/submitReport", catchAsync(getallReports));
reportRouter.delete("/submitReport", catchAsync(deleteReports));
reportRouter.post("/userReport", catchAsync(userReported));
reportRouter.get("/userReport", catchAsync(getAllReportedUser));
reportRouter.delete("/userReport", catchAsync(deleteReportedUser));
