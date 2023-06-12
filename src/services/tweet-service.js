const TweetRepository = require("../repository");

class TweetService {
  constructor() {
    this.TweetRepository = TweetRepository;
  }

  async create(data) {
    const content = data.content;
    const tags = content.match(/#[a-zA-Z0-9_]+/g); // this regex extracts hashtags
    tags = tags.map((tag) => tag.substring(1));
    console.log(tags);
    const tweet = await this.TweetRepository.create(data);
    return tweet;
  }
}

module.exports = TweetService;
