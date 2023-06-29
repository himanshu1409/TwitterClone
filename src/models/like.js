import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    onModel: {
      type: String,
      required: true,
      enum: ["Tweet", "Comment"],
    },
    // likeable stores modelId i.e tweet id if tweet is liked and comment id if comment is liked
    likeable: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "onModel",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Like = mongoose.model("Like", likeSchema);
export default Like;
