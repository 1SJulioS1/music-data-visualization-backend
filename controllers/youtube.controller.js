import {
  getMostPopularVideos,
  getChannelDetail,
} from "../utils/fetchYoutubeAPI.js";
import { logger } from "../config/winstonConfig.js";
/**
 * Controlador que obtiene videos más populares en una región
 * @route GET /api/youtube/popular/:regionCode
 */
export async function getPopularByRegion(req, res, next) {
  try {
    const { regionCode } = req.params;

    if (!regionCode || regionCode.length !== 2) {
      logger.warn(`Invalid regionCode parameter: ${regionCode}`);
      return res
        .status(400)
        .json({ success: false, message: "Invalid regionCode parameter" });
    }

    const result = await getMostPopularVideos(regionCode);

    res.json({ success: true, data: result });
  } catch (error) {
    logger.error(`Error in getPopularByRegion: ${error.message}`);
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
    if (!channelId) {
      logger.warn(`Invalid channelId parameter: ${channelId}`);
      return res
        .status(400)
        .json({ success: false, message: "Invalid channelId parameter" });
    }

    const result = await getChannelDetail(channelId);

    res.json({ success: true, data: result });
  } catch (error) {
    logger.error(`Error in getChannelById: ${error.message}`);
    next(error);
  }
}
