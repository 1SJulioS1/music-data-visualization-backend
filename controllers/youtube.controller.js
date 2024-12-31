import getMostPopularVideos from "../utils/fetchYoutubeAPI.js";

/**
 * Controlador que obtiene videos más populares en una región
 * @route GET /api/youtube/popular/:regionCode
 */
export async function getPopularByRegion(req, res, next) {
  try {
    const { regionCode } = req.params;
    console.log(regionCode);
    const result = await getMostPopularVideos(regionCode);
    // result contendrá items con snippet, statistics, etc.
    res.json(result);
  } catch (error) {
    next(error);
  }
}
