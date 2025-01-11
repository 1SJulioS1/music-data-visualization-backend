import {
  getMostPopularVideos,
  getChannelDetail,
} from "../utils/fetchYoutubeAPI.js";

/**
 * Controlador que obtiene videos más populares en una región
 * @route GET /api/youtube/popular/:regionCode
 */
export async function getPopularByRegion(req, res, next) {
  try {
    const { regionCode } = req.params;
    const result = await getMostPopularVideos(regionCode);
    // result contendrá items con snippet, statistics, etc.
    res.json(result);
  } catch (error) {
    next(error);
  }
}
/**
 * Controlador que obtiene detalles de un canal
 * @route GET /api/youtube/channel/:channelId
 */
export async function getChannelById(req, res, next) {
  try {
    const { channelId } = req.params;
    const result = await getChannelDetail(channelId);
    res.json(result);
  } catch (error) {
    next(error);
  }
}
