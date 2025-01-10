import { spotifyClientID, spotifyClientSecret } from "../config/index.js";

let spotifyToken = {
  accessToken: null,
  expiresAt: null, // Timestamp de expiración
};

export async function getAccessToken() {
  const axios = require("axios");
  const tokenUrl = "https://accounts.spotify.com/api/token";
  const credentials = Buffer.from(
    `${spotifyClientID}:${spotifyClientSecret}`
  ).toString("base64");

  const response = await axios.post(tokenUrl, "grant_type=client_credentials", {
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  // Guardar el token y su expiración
  spotifyToken.accessToken = response.data.access_token;
  spotifyToken.expiresAt = Date.now() + response.data.expires_in * 1000; // Tiempo actual + tiempo de expiración en ms
}

export async function ensureAccessToken(clientId, clientSecret) {
  if (!spotifyToken.accessToken || Date.now() > spotifyToken.expiresAt) {
    await getAccessToken(clientId, clientSecret);
  }
  return spotifyToken.accessToken;
}
