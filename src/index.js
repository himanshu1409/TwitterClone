import express from "express";

const app = express();

import { connect } from "./config/database.js";

app.listen(3000, async () => {
  console.log("Server started");
  await connect();
  console.log("Mongo db connected");
});
