import passport from "passport";
import { Router } from "express";
import { catchAsync } from "../middleware/index.js";
import {
  createBoostPost,
  impressionChart,
  getBoostPost,
  // getAllBoostPost,
  getAllUserBoostPost,
  impressionCount,
  deleteBoostPost,
} from "../controller/boost.controller.js";

export const boostPostRoute = Router();

// create-boost-post
boostPostRoute.post(
  "/create-boost-post",
  passport.authenticate("jwt", { session: false }),
  catchAsync(createBoostPost)
);
// get-boost-post
boostPostRoute.get(
  "/get-boost-post/:postId",
  passport.authenticate("jwt", { session: false }),
  catchAsync(getBoostPost)
);

// get-all-user-boost-post
boostPostRoute.get(
  "/get-all-user-boost-post",
  passport.authenticate("jwt", {
    session: false,
  }),
  catchAsync(getAllUserBoostPost)
);

// get-all-boost-post
// boostPostRoute.get("/get-all-boost-post", catchAsync(getAllBoostPost));

//delete-boost-post
boostPostRoute.delete(
  "/delete-boost-post/:postId",
  passport.authenticate("jwt", {
    session: false,
  }),
  catchAsync(deleteBoostPost)
);

//impression-count
boostPostRoute.get(
  "/impression-count/:boostPostId",
  passport.authenticate("jwt", {
    session: false,
  }),
  catchAsync(impressionCount)
);

//impression-count
boostPostRoute.get(
  "/impression/:boostPostId/:day",
  passport.authenticate("jwt", {
    session: false,
  }),
  catchAsync(impressionChart)
);
