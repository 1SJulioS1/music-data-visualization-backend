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
    const resultTop10 = result.tracks.items.slice(0, 10);

    res.json({ success: true, data: resultTop10 });
  } catch (error) {
    logger.error(`Error in getPlaylist: ${error.message}`);
    next(error);
  }
}
