import axios from "axios";
import { getCachedImage, setCachedImage } from "./imageCache.js"; // Adjust path as needed

const NETFLIX_API_URL = "https://pulse.prod.cloud.netflix.com/graphql";

export async function fetchImage(category, country, rank) {
  // 1. Check cache first
  const cached = getCachedImage(category, country, rank);
  if (cached) {
    return cached;
  }

  // 2. If not in cache, call Netflix’s API
  const body = {
    operationName: "TudumTop10ArtworkQuery",
    variables: {
      request: {
        category: category.toUpperCase(),
        orientation: "SQUARE",
        country: country.toUpperCase(),
        language: "en",
        week: null,
        rank: rank.toString(),
      },
    },
    extensions: {
      persistedQuery: {
        id: "46c4ce0b-2512-4597-930b-bb699f3d4264",
        version: 102,
      },
    },
  };

  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(NETFLIX_API_URL, body, { headers });
    const url = response.data?.data?.tudumTop10Artwork?.url || null;

    // 3. Store the fetched URL in cache
    setCachedImage(category, country, rank, url);

    return url;
  } catch (error) {
    console.error(
      `Error fetching image for ${category} - Country: ${country}, Rank: ${rank}`,
      error.message
    );
    return null;
  }
}
