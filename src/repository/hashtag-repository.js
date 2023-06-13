import Hashtag from "../models/hashtags.js";

class HashtagRepository {
  async create(data) {
    try {
      const tag = await Hashtag.create(data);
      return tag;
    } catch (error) {
      console.log(error);
    }
  }

  async bulkCreate(data) {
    try {
      const tags = await Hashtag.insertMany(data);
      return tags;
    } catch (error) {
      console.log(error);
    }
  }

  async get(id) {
    try {
      const tag = await Hashtag.findById(id);
      return tag;
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

  async findByName(titleList) {
    try {
      // Some hashtags may already be present, this function will return the title of already created hashags
      const tags = await Hashtag.find({ title: titleList });
      return tags;
    } catch (error) {
      console.log(error);
    }
  }
}

export default HashtagRepository;
