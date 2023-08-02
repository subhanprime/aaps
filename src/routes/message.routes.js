import {messageHandler,getMessages } from "../controller/index.js";
import { catchAsync } from "../middleware/handleErrors.js";
import { Router } from "express";
import passport from "passport";

export const messageRoute = Router();

messageRoute.post("/message",passport.authenticate("jwt", { session: false }),catchAsync(messageHandler));
messageRoute.get("/message",passport.authenticate("jwt", { session: false }), catchAsync(getMessages));

