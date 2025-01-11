import { chromium } from "playwright";
import axios from "axios";
import { countryPlaylist } from "../data/top50SpotifyPlaylist.js";
import { filterData } from "./filterSpotifyData.js";
import { withRetries } from "./retries.js";

export async function getWebToken() {
  const url = "https://open.spotify.com/playlist/37i9dQZEVXbNG2KDcFcKOF";
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const requestPromise = page.waitForRequest((request) =>
    request.url().includes("pathfinder/v1/query")
  );
  await page.goto(url);
  const request = await requestPromise;
  const authHeader = request.headers()["authorization"];
  const token = authHeader.replace("Bearer", "").trim();
  await browser.close();
  return token;
}

async function fetchPlaylistData(country, accessToken) {
  const url = `https://api.spotify.com/v1/playlists/${countryPlaylist[country]}`;
  const headers = { Authorization: `Bearer ${accessToken}` };

  return await withRetries(async () => {
    const response = await axios.get(url, { headers });
    const data = response.data;

    if (!data.tracks || !data.tracks.items) {
      logger.error('Invalid response structure: missing "tracks" or "items".');
    }
    return data;
  });
}

export async function getPlaylistData(country, accessToken) {
  const data = await fetchPlaylistData(country, accessToken);
  return filterData(data);
}
