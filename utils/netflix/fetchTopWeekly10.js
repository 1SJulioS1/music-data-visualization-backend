import fs from "fs";
import path from "path";
import axios from "axios";

export const downloadNetflixTop10 = async () => {
  const url =
    "https://www.netflix.com/tudum/top10/data/all-weeks-countries.tsv";
  const downloadPath = path.resolve("downloads", "all-weeks-countries.tsv"); // Ruta del archivo descargado

  try {
    console.log("Starting download of Netflix data...");
    const response = await axios.get(url, { responseType: "stream" });

    // Asegurarse de que la carpeta de descargas existe
    const directory = path.dirname(downloadPath);
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true }); // Esto no requiere callback en Node.js 14+
    }

    // Guardar el archivo
    const writer = fs.createWriteStream(downloadPath);
    response.data.pipe(writer);

    writer.on("finish", () => {
      console.log(`File downloaded successfully to ${downloadPath}`);
    });

    writer.on("error", (err) => {
      console.error("Error saving the file:", err.message);
    });
  } catch (error) {
    console.error("Error downloading the file:", error.message);
  }
};
