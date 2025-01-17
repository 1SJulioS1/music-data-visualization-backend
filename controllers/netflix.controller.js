import fs from "fs/promises";
import processNetflixTop10 from "../utils/netflix/netflixProcessor.js";

const PROCESSED_FILE_PATH = "processed/latest-netflix-top.json";

export async function getList(req, res) {
  const { country_iso2 } = req.params;

  if (!country_iso2 || country_iso2.length !== 2) {
    return res.status(400).json({
      success: false,
      message:
        "Invalid or missing country_iso2 parameter. Provide a valid ISO Alpha-2 code.",
    });
  }

  try {
    // Check if the processed file exists
    try {
      await fs.access(PROCESSED_FILE_PATH);
      console.log("Processed file found. Reading data...");
    } catch {
      console.log("Processed file not found. Processing data...");
      await processNetflixTop10(); // Generate the processed data
    }

    // Read the processed file
    const data = await fs.readFile(PROCESSED_FILE_PATH, "utf-8");
    const jsonData = JSON.parse(data);

    // Extract data for the requested country
    const countryData = jsonData.country_list[country_iso2.toUpperCase()];

    if (!countryData) {
      return res.status(404).json({
        success: false,
        message: `No data found for country with ISO code '${country_iso2}'.`,
      });
    }

    // Respond with the country's data
    res.status(200).json({
      success: true,
      message: `Netflix Top 10 data retrieved successfully for country '${country_iso2}'.`,
      data: countryData,
    });
  } catch (error) {
    console.error("Error in getList:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Netflix Top 10 data.",
      error: error.message,
    });
  }
}
