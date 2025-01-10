import { getWebToken, getPlaylistData } from "../utils/fetchSpotify.js";

export async function getPlaylist(req, res, next) {
  try {
    const { playlistId, country } = req.params;
    const accessToken = await getWebToken();
    const result = await getPlaylistData(playlistId, country, accessToken);
    res.json(result);
  } catch (error) {
    next(error);
  }
}
