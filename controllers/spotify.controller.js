import { getWebToken, getPlaylistData } from "../utils/fetchSpotify.js";
import { logger } from "../config/winstonConfig.js";
import { countryPlaylist } from "../data/top50SpotifyPlaylist.js";

export async function getPlaylist(req, res, next) {
  try {
    const { country } = req.params;

    if (!countryPlaylist[country]) {
      logger.warn(`Invalid country parameter: ${country}`);
      return res
        .status(400)
        .json({ success: false, message: "Invalid country parameter" });
    }

    const accessToken = await getWebToken();
    const result = await getPlaylistData(country, accessToken);

    res.json({ success: true, data: result });
  } catch (error) {
    logger.error(`Error in getPlaylist: ${error.message}`);
    next(error);
  }
}
