import dotenv from "dotenv";
dotenv.config();

export const port = process.env.PORT || 3000;
export const youtubeApiKey = process.env.YOUTUBE_API_KEY;
export const spotifyClientID = process.env.SPOTIFY_CLIENT_ID;
export const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;
