import fs from "fs-extra";
import path from "path";
import Papa from "papaparse";
import { downloadNetflixTop10 } from "./netflixDownloader.js";

const OUTPUT_DIR = path.resolve("processed");
const LATEST_TOP_FILE = "latest-netflix-top.json";

const parseTSV = async (filePath) => {
  const fileContent = await fs.readFile(filePath, "utf8");
  return new Promise((resolve, reject) => {
    Papa.parse(fileContent, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
      error: (err) => reject(`Error parsing TSV: ${err.message}`),
    });
  });
};

const getLatestDate = (data) => {
  const dates = [...new Set(data.map((row) => row.week))];
  return dates.sort().pop();
};

const processNetflixTop10 = async () => {
  try {
    const tempFilePath = await downloadNetflixTop10();
    console.log("File downloaded, starting processing...");

    const data = await parseTSV(tempFilePath);

    // Get the latest date
    const latestDate = getLatestDate(data);

    // Group data by country and category
    const groupedData = data
      .filter((row) => row.week === latestDate)
      .reduce((acc, row) => {
        const countryIso2 = row.country_iso2;
        const category = row.category.toLowerCase(); // 'films' or 'tv'

        if (!acc[countryIso2]) {
          acc[countryIso2] = {
            country_name: row.country_name,
            films: [],
            tv: [],
          };
        }

        const entry = {
          nombre: row.show_title,
          posicion: parseInt(row.weekly_rank, 10),
          cumulative_weeks_in_top_10: parseInt(
            row.cumulative_weeks_in_top_10,
            10
          ),
        };

        if (category === "tv") {
          entry.season_title = row.season_title;
        }

        acc[countryIso2][category].push(entry);

        return acc;
      }, {});

    // Construct the final JSON structure
    const finalData = {
      week: latestDate,
      country_list: groupedData,
    };

    // Save the processed data
    const outputFilePath = path.join(OUTPUT_DIR, LATEST_TOP_FILE);
    await fs.ensureDir(OUTPUT_DIR);
    await fs.writeJSON(outputFilePath, finalData, { spaces: 2 });

    console.log(
      `Processing completed. Processed data saved to: ${outputFilePath}`
    );
  } catch (error) {
    console.error("Error processing Netflix Top 10:", error.message);
  }
};

export default processNetflixTop10;
