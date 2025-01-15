import { logger } from "../config/winstonConfig.js";
import { downloadNetflixTop10 } from "../utils/netflix/fetchTopWeekly10.js";
export async function getList(req, res, next) {
  try {
    downloadNetflixTop10().then((result) => {
      res.json({ success: true, data: result });
    });
  } catch (error) {
    logger.error(`Error in getList: ${error.message}`);
    next(error);
  }
}
