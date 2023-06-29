import { LikeRepository, TweetRepository } from "../repository/index.js";

class LikeService {
  constructor() {
    this.likeRepository = new LikeRepository();
    this.tweetRepository = new TweetRepository();
  }

  async toggleLike(modelId, modelType, userId) {
    // /api/v1/likes/toggle?id=modelId&type=Tweet
    if (modelType == "Tweet") {
      var likeable = await this.tweetRepository.get(modelId);
      likeable.populate({ path: "likes" }); // to populate array we need to give property path
    } else if (modelType == "Comment") {
      // TODO
    } else {
      throw new Error("Unknown model type");
    }
    const exists = await this.likeRepository.findByUserAndLikeable({
      user: userId,
      onModel: modelType,
      likeable: modelId,
    });
    // console.log("exists", exists);
    if (exists) {
      likeable.likes.pull(exists.id); // removing like from model
      await likeable.save();
      await this.likeRepository.destroy(exists.id);
      // await exists.remove(); // deleting the like object
      var isAdded = false;
    } else {
      const newLike = await this.likeRepository.create({
        user: userId,
        onModel: modelType,
        likeable: modelId,
      });
      likeable.likes.push(newLike);
      await likeable.save();

      var isAdded = true;
    }
    return isAdded;
  }
}

export default LikeService;
