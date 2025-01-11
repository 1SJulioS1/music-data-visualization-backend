import { spotifyClientID, spotifyClientSecret } from "../config/index.js";
import { handleHttpResponse } from "../utils/handleHttpResponse.js";
import logger from "../utils/logger.js";
import axios from "axios";

let spotifyToken = {
  accessToken: null,
  expiresAt: null,
};

/**
 * Obtiene un nuevo token de acceso desde la API de Spotify
 */
export async function getAccessToken() {
  const tokenUrl = "https://accounts.spotify.com/api/token";
  const credentials = Buffer.from(
    `${spotifyClientID}:${spotifyClientSecret}`
  ).toString("base64");

  try {
    const response = await axios.post(
      tokenUrl,
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const data = handleHttpResponse(response);

    spotifyToken.accessToken = data.access_token;
    spotifyToken.expiresAt = Date.now() + data.expires_in * 1000; // Tiempo actual + tiempo de expiración en ms

    logger.info("Spotify access token successfully obtained.");
  } catch (error) {
    logger.error(`Error obtaining Spotify access token: ${error.message}`);
    throw error;
  }
}

/**
 * Asegura que el token de acceso esté disponible y válido
 */
export async function ensureAccessToken() {
  try {
    if (!spotifyToken.accessToken || Date.now() > spotifyToken.expiresAt) {
      logger.info("Spotify token expired or missing. Fetching a new token.");
      await getAccessToken();
    }
    return spotifyToken.accessToken;
  } catch (error) {
    logger.error(`Error ensuring Spotify access token: ${error.message}`);
    throw error;
  }
}
