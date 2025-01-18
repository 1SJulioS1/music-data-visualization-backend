import fs from "fs-extra";
import path from "path";

// You could store cache in memory:
let cache = {};

const CACHE_FILE = path.resolve("processed", "imageCache.json");

// Load cache from disk (if exists)
export function loadCache() {
  if (fs.existsSync(CACHE_FILE)) {
    try {
      cache = JSON.parse(fs.readFileSync(CACHE_FILE, "utf8"));
    } catch (err) {
      console.error("Error loading cache file:", err.message);
      cache = {};
    }
  }
}

// Save cache to disk
export function saveCache() {
  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing cache file:", err.message);
  }
}

// Get item from cache
export function getCachedImage(category, country, rank) {
  const key = `${category.toUpperCase()}_${country.toUpperCase()}_${rank}`;
  return cache[key] || null;
}

// Store item in cache
export function setCachedImage(category, country, rank, url) {
  const key = `${category.toUpperCase()}_${country.toUpperCase()}_${rank}`;
  cache[key] = url;
}
