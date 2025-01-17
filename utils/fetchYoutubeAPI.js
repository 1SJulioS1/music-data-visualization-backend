import fetch from "node-fetch";
import { logger } from "../config/winstonConfig.js";
import { youtubeApiKey } from "../config/environment.js";

/**
 * Llama a la YouTube Data API para obtener los videos más populares en una región
 * utilizando chart=mostPopular.
 * @param {string} regionCode - Código de país (ej. "US", "MX", "ES").
 * @returns {Promise<Object>} - JSON con la información de los videos (snippet, statistics).
 */
export async function getMostPopularVideos(regionCode) {
  // Ejemplo de endpoint:
  // GET https://www.googleapis.com/youtube/v3/videos
  //   ?chart=mostPopular

  //   &regionCode=US
  //   &maxResults=10
  //   &part=snippet,statistics
  //   &key=YOUR_API_KEY

  const baseUrl = "https://www.googleapis.com/youtube/v3/videos";
  const url = new URL(baseUrl);
  url.searchParams.set("chart", "mostPopular");
  url.searchParams.set("regionCode", regionCode);
  url.searchParams.set("maxResults", "10");
  url.searchParams.set("part", "snippet,statistics");
  url.searchParams.set("key", youtubeApiKey);

  const response = await fetch(url.toString());
  if (!response.ok) {
    logger.info(response);
    logger.error(`Error fetching playlist data for ${regionCode}: ${response}`);
  }

  return response.json();
}
export async function getChannelDetail(channelId) {
  const baseUrl = "https://www.googleapis.com/youtube/v3/channels";
  const url = new URL(baseUrl);
  url.searchParams.set("part", "snippet,statistics,contentDetails");
  url.searchParams.set("id", channelId);
  url.searchParams.set("key", youtubeApiKey);

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      logger.error(
        `YouTube API error: ${response.status} ${response.statusText}`
      );
    }
    return response.json();
  } catch (error) {
    logger.error(`Error fetching channel details: ${error}`);
  }
}
