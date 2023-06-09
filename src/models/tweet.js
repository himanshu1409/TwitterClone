import mongoose from "mongoose";

// Creating a basic schema for a tweet
const tweetSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      max: [250, "Tweet cannot be more than 250 characters"],
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
    // userEmail: { type: String },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }], // Storing comment id
    // hashtags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hashtag" }],
    image: { type: String },
  },
  { timestamps: true }
);

// Intializing a model for the tweet schema
const Tweet = mongoose.model("Tweet", tweetSchema);
export default Tweet;
