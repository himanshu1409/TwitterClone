import Tweet from "../models/tweet.js";

class TweetRepository {
  async create(data) {
    try {
      const tweet = await Tweet.create(data);
      return tweet;
    } catch (error) {
      console.log(error);
    }
  }

  async get(id) {
    try {
      const tweet = await Tweet.findById(id);
      return tweet;
    } catch (error) {
      console.log(error);
    }
  }

  async getWithComments(id) {
    try {
      // Comments is an array so we need to pass as path
      const tweet = await Tweet.findById(id)
        .populate({ path: "comments" })
        .lean();
      return tweet;
    } catch (error) {
      console.log(error);
    }
  }

  async delete() {
    try {
      const response = await Tweet.findByIdAndRemove(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll(offset, limit) {
    try {
      const tweet = await Tweet.find().skip(offset).limit(limit);
      return tweet;
    } catch (error) {
      console.log(error);
    }
  }
}

export default TweetRepository;
