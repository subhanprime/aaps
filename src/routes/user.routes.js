//update user Profile
import { Router } from "express";
import { catchAsync } from "../middleware/index.js";
import {
  updateProfile,
  UserData,
  userCount,
  allUser,
  deleteUser,
  handleUserSearch,
  createRating,
  identifyDocument,
  getAllRequestForIdentify,
  approveRequestForIdentify,
} from "../controller/index.js";
import passport from "passport";
export const userRoutes = Router();

userRoutes.put(
  "/updateProfile",
  passport.authenticate("jwt", { session: false }),
  catchAsync(updateProfile)
);
// user Data
userRoutes.get("/userData/:userId", catchAsync(UserData));

// userRolesData
userRoutes.get("/userRolesData/:role", catchAsync(userCount));

userRoutes.get("/allUser", catchAsync(allUser));

// userRoutes.get("/deleteUser", (req, res) => {
//   console.log("delete user user");
//   res.send('delete user')
// });

userRoutes.delete("/deleteUser", catchAsync(deleteUser));
userRoutes.get("/search/:text", catchAsync(handleUserSearch));

userRoutes.post("/addRating", catchAsync(createRating));
userRoutes.post(
  "/identify-docs",
  passport.authenticate("jwt", { session: false }),
  catchAsync(identifyDocument)
);

userRoutes.get("/identify-docs", catchAsync(getAllRequestForIdentify));
userRoutes.post("/approve-identify-docs", catchAsync(approveRequestForIdentify));
