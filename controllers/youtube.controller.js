const { getMostPopularVideos } = require("../utils/fetchYoutubeAPI").default;

/**
 * Controlador que obtiene videos más populares en una región
 * @route GET /api/youtube/popular/:regionCode
 */
async function getPopularByRegion(req, res, next) {
  try {
    const { regionCode } = req.params;
    const result = await getMostPopularVideos(regionCode);
    // result contendrá items con snippet, statistics, etc.
    res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getPopularByRegion,
};
