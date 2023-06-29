import { TweetRepository, HashtagRepository } from "../repository/index.js";

class TweetService {
  constructor() {
    this.tweetRepository = new TweetRepository();
    this.hashtagRepository = new HashtagRepository();
  }

  async create(data) {
    const tweet = await this.tweetRepository.create(data);
    const content = data.content;
    let tags = content.match(/#[a-zA-Z0-9_]+/g); // this regex extracts hashtags
    if (tags == null) return tweet;
    tags = tags.map((tag) => tag.substring(1)).map((tag) => tag.toLowerCase());
    // this will return an array of object with title of already present hashtags [{title:""},..]
    let alreadyPresentTags = await this.hashtagRepository.findByName(tags);
    // this will return an array containing just the titles of already present hashtags
    let titleOfAlreadyPresentTags = alreadyPresentTags.map((tag) => tag.title);
    let newTags = tags.filter(
      (tag) => !titleOfAlreadyPresentTags.includes(tag)
    );
    // creating a new array of hashtags for bulkCreate
    newTags = newTags.map((tag) => {
      return { title: tag, tweets: [tweet] };
    });
    await this.hashtagRepository.bulkCreate(newTags);
    alreadyPresentTags.forEach((tag) => {
      tag.tweets.push(tweet.id);
      tag.save();
    });
    return tweet;
  }

  async get(tweetId) {
    const tweet = await this.tweetRepository.getWithComments(tweetId);
    return tweet;
  }
}

export default TweetService;
