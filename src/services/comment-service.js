import { TweetRepository, CommentRepository } from "../repository/index.js";

class CommentService {
  constructor() {
    this.CommentRepository = new CommentRepository();
    this.TweetRepository = new TweetRepository();
  }

  async createComment(modelType, modelId, userId, content) {
    if (modelType == "Tweet") {
      var commentable = await this.TweetRepository.get(modelId);
    } else if (modelType == "Comment") {
      var commentable = await this.CommentRepository.get(modelId);
    } else {
      throw new Error("Unknown model type");
    }

    const comment = await this.CommentRepository.create({
      content: content,
      userId: userId,
      onModel: modelType,
      commentable: modelId,
      comments: [],
    });
    commentable.comments.push(comment);
    await commentable.save();

    return comment;
  }
}

export default CommentService;
