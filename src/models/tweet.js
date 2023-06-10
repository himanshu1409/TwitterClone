const mongoose = require("mongoose");

// Creating a basic schema for a tweet
const tweetSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    userEmail: { type: String },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }], // Storing comment id
  },
  { timestamps: true }
);

// Intializing a model for the tweet schema
const Tweet = mongoose.model("Tweet", tweetSchema);
module.exports = Tweet;
