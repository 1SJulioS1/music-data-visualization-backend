import { getWebToken, getPlaylistData } from "../utils/fetchSpotify.js";

export async function getPlaylist(req, res, next) {
  try {
    const { country } = req.params;
    const accessToken = await getWebToken();
    const result = await getPlaylistData(country, accessToken);
    res.json(result);
  } catch (error) {
    next(error);
  }
}
