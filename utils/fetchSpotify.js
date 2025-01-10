import fetch from "node-fetch";
import {
  youtubeApiKey,
  spotifyClientID,
  spotifyClientSecret,
} from "../config/index.js";
import { chromium } from "playwright";
import { ensureAccessToken } from "../services/spotifyTokenManager.js";
import axios from "axios";

export async function getWebToken() {
  const url = "https://open.spotify.com/playlist/37i9dQZEVXbNG2KDcFcKOF";

  // Launch a headless browser
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Intercept the network request matching the pattern
  const requestPromise = page.waitForRequest((request) =>
    request.url().includes("pathfinder/v1/query")
  );

  // Navigate to the Spotify playlist URL
  await page.goto(url);

  // Capture the intercepted request
  const request = await requestPromise;

  // Extract the Authorization header
  const authHeader = request.headers()["authorization"];
  const token = authHeader.replace("Bearer", "").trim();

  // Close the browser and return the token
  await browser.close();
  return token;
}

/**
 * Retrieves playlist data from the Spotify API for a given playlist ID.
 *
 * This function sends a request to the Spotify API to fetch details about a specific
 * playlist, identified by the provided playlist ID. It includes error handling with
 * retries in case of failed requests.
 *
 * @param {string} playlistId - The unique identifier for the Spotify playlist.
 * @param {string} country - The name of the country for which the playlist data is being retrieved.
 * @param {string} accessToken - The access token for authenticating with the Spotify API.
 * @returns {Promise<Object>} - The JSON response from the Spotify API containing playlist data, including tracks.
 * @throws {Error} - If the API request fails after 5 retries.
 */
export async function getPlaylistData(playlistId, country, accessToken) {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}`;
  const headers = { Authorization: `Bearer ${accessToken}` };
  const maxRetries = 5;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const response = await axios.get(url, { headers });
      const data = response.data;

      if (!data.tracks || !data.tracks.items) {
        throw new Error(
          'Invalid response structure: missing "tracks" or "items".'
        );
      }

      return data;
    } catch (error) {
      console.error(
        `Error fetching playlist data for ${country}: ${error.message}`
      );
      retries++;
      if (retries >= maxRetries) {
        throw new Error(
          `Failed to fetch playlist data after ${maxRetries} retries.`
        );
      }
      console.info(`Retrying... (${retries}/${maxRetries})`);
      await new Promise((resolve) => setTimeout(resolve, 30000)); // Wait for 30 seconds before retrying
    }
  }
}
