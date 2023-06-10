const mongoose = require("mongoose");

// Creating a basic schema for a tweet
const tweetSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      max: [250, "Tweet cannot be more than 250 characters"],
    },
    // userEmail: { type: String },
    // comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }], // Storing comment id
    hashtags: [{ type: mongoose.SchemaType.Types.ObjectId, ref: "Hashtag" }],
  },
  { timestamps: true }
);

// Intializing a model for the tweet schema
const Tweet = mongoose.model("Tweet", tweetSchema);
module.exports = Tweet;
