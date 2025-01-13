import axios from "axios";
import { countryPlaylist } from "../data/top50SpotifyPlaylist.js";
import { filterData } from "./filterSpotifyData.js";
import { withRetries } from "./retries.js";
import { handleHttpResponse } from "../utils/handleHttpResponse.js";
import { logger } from "../config/winstonConfig.js";

/**
 * Fetch the Spotify web token by scraping the playlist page HTML.
 * This does not require Chromium or any other headless browser.
 */
export async function getWebToken() {
  const url = "https://open.spotify.com/playlist/37i9dQZEVXbNG2KDcFcKOF";
  const response = await axios.get(url);
  const html = response.data;

  // Attempt to find the token in a string like: "accessToken":"<TOKEN>"
  const tokenMatch = html.match(/"accessToken":"(.*?)"/);

  if (!tokenMatch) {
    throw new Error("Could not find access token in Spotify page HTML.");
  }

  // tokenMatch[1] should contain the actual token
  const token = tokenMatch[1];
  return token;
}

async function fetchPlaylistData(country, accessToken) {
  const url = `https://api.spotify.com/v1/playlists/${countryPlaylist[country]}`;
  const headers = { Authorization: `Bearer ${accessToken}` };

  return await withRetries(async () => {
    try {
      const response = await axios.get(url, { headers });
      const data = handleHttpResponse(response);
      logger.info(`Playlist data fetched successfully for ${country}`);
      return data;
    } catch (error) {
      logger.error(
        `Error fetching playlist data for ${country}: ${error.message}`
      );
      throw error;
    }
  });
}

export async function getPlaylistData(country, accessToken) {
  const data = await fetchPlaylistData(country, accessToken);
  // Filter the data according to your custom logic in filterSpotifyData.js
  return filterData(data);
}
