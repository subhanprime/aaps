import "dotenv/config";
import express from "express";
import cors from "cors";
import {
  authRoutes,
  postRoutes,
  userRoutes,
  recaptchaRoutes,
  reportRouter,
  termsRouter,
  policyRouter,
  feedbackRouter,
  conversationRoute,
  messageRoute,
} from "./routes/index.js";
import { connectDB } from "./utils/index.js";
import { passportMiddleware, serverError } from "./middleware/index.js";
import passport from "passport";
import session from "express-session";
import { User } from "./models/user.js";
import { boostPostRoute } from "./routes/boost.routes.js";
import { commentRoutes } from "./routes/comments.routes.js";
import { Server } from "socket.io";
import { appMessages } from "./controller/sockets/socket.js";
import { allowedOrigins } from "./config/allowedOrigins.js";
// const { Server } = require("socket.io");
const { PORT, APP_SECRET } = process.env;

const app = express();
app.use(express.json({ limit: "200mb" }));
app.use(cors());
app.use(
  session({
    secret: APP_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.urlencoded({ limit: "200mb", extended: true }));

app.use(passport.initialize());
app.use(passport.session());
passportMiddleware(passport);
app.use("/api/auth", authRoutes);
app.use("/api/report", reportRouter);
app.use("/api/post", postRoutes);
app.use("/api/user", userRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api", conversationRoute);
app.use("/", recaptchaRoutes);
app.use("/api", termsRouter);
app.use("/api", policyRouter);
app.use("/api", feedbackRouter);
app.use("/api", messageRoute);
//boost post
app.use("/api/boost", boostPostRoute);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

const main = async () => {
  await connectDB();
  const server = app.listen(PORT, async () => {
    console.log(`Server Running On Port ${PORT}`);
  });

  const socketIo = new Server(server, {
    pingTimeout: 60000,
    cors: {
      origin: process.env.NODE_ENV === "production" ? "" : allowedOrigins,
      methods: ["GET", "POST"],
    },
  });

  let users = [];

  socketIo.on("connection", (socket) => {
    const addUser = (userId, socketId) => {
      !users.some((user) => user.userId == userId) &&
        users.push({ userId, socketId });
    };
    const removeUser = (socketId) => {
      users = users?.filter((user) => user?.socketId != socketId);
    };

    const getUser = (userId) => {
      let user = users.find((user) => user.userId == userId);
      return user;
    };
    socket.on("disconnect", () => {
      removeUser(socket.id);
    });

    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      console.log("user", users);
      let user = getUser(userId);
      socket.emit("getUser", user);
    });

    socket.on("addComment", (data) => {
      socket.broadcast.emit("arrivedComment", data);
    });
    socket.on("addLike", (data) => {
      socket.broadcast.emit("arrivedLike", data);
    });


    socket.on("innerCommentLike", (data) => {
      socket.broadcast.emit("arrivedInnerCommentLike", data);
    });
  });
};
//Routes

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
app.use(serverError);
