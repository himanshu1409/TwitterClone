import express from "express";
import bodyParser from "body-parser";
import passport from "passport";

import { connect } from "./config/database.js";
import { passportAuth } from "./config/jwt-middleware.js";
import apiRoutes from "./routes/index.js";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
passportAuth(passport);

import { UserRepository, TweetRepository } from "./repository/index.js";
import LikeService from "./services/like-service.js";

app.use("/api", apiRoutes);

app.listen(3000, async () => {
  console.log("Server started");
  await connect();
  console.log("Mongo db connected");

  const userRepo = new UserRepository();
  const tweetRepo = new TweetRepository();
  const likeService = new LikeService();
});
