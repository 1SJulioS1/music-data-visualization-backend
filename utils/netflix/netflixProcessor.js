import fs from "fs-extra";
import path from "path";
import Papa from "papaparse";
import { downloadNetflixTop10 } from "./netflixDownloader.js";

const OUTPUT_DIR = path.resolve("processed");
const LATEST_MOVIES_FILE = "latest-netflix-top-movies.json";
const LATEST_SHOWS_FILE = "latest-netflix-top-shows.json";

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
    // 2. Download the TSV file
    const tempFilePath = await downloadNetflixTop10();
    console.log("File downloaded, starting processing...");

    // 3. Parse the TSV
    const data = await parseTSV(tempFilePath);

    // 4. Get the latest date
    const latestDate = getLatestDate(data);
    const filteredData = data.filter((row) => row.week === latestDate);

    // Prepare structures for movies/shows
    const moviesData = { week: latestDate, country_list: {} };
    const showsData = { week: latestDate, country_list: {} };

    // 5. Iterate through entries
    for (const row of filteredData) {
      const countryIso2 = row.country_iso2;
      const category = row.category.toLowerCase(); // 'films' or 'tv'
      const rank = parseInt(row.weekly_rank, 10);

      const entry = {
        name: row.show_title,
        rank,
        cumulative_weeks_in_top_10: parseInt(
          row.cumulative_weeks_in_top_10,
          10
        ),
      };

      if (category === "tv") {
        entry.season_title = row.season_title;
      }

      // 5b. Add to moviesData or showsData
      if (category === "films") {
        if (!moviesData.country_list[countryIso2]) {
          moviesData.country_list[countryIso2] = {
            country_name: row.country_name,
            films: [],
          };
        }
        moviesData.country_list[countryIso2].films.push(entry);
      } else if (category === "tv") {
        if (!showsData.country_list[countryIso2]) {
          showsData.country_list[countryIso2] = {
            country_name: row.country_name,
            tv: [],
          };
        }
        showsData.country_list[countryIso2].tv.push(entry);
      }
    }

    // 6. Ensure output directory exists
    await fs.ensureDir(OUTPUT_DIR);

    // 7. Write two separate JSON files
    const moviesFilePath = path.join(OUTPUT_DIR, LATEST_MOVIES_FILE);
    const showsFilePath = path.join(OUTPUT_DIR, LATEST_SHOWS_FILE);

    await fs.writeJSON(moviesFilePath, moviesData, { spaces: 2 });
    await fs.writeJSON(showsFilePath, showsData, { spaces: 2 });

    console.log("Processing completed.");
    console.log(`Movies data saved to: ${moviesFilePath}`);
    console.log(`Shows data saved to: ${showsFilePath}`);
  } catch (error) {
    console.error("Error processing Netflix Top 10:", error.message);
  }
};

export default processNetflixTop10;
