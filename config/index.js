require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  youtubeApiKey: process.env.YOUTUBE_API_KEY
};
