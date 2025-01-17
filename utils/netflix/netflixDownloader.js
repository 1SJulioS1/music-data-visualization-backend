import fs from "fs-extra";
import path from "path";
import axios from "axios";

const DOWNLOAD_URL =
  "https://www.netflix.com/tudum/top10/data/all-weeks-countries.tsv";
const DOWNLOAD_DIR = path.resolve("downloads");

export const downloadNetflixTop10 = async () => {
  try {
    const response = await axios.get(DOWNLOAD_URL, { responseType: "stream" });
    const tempFilePath = path.join(
      DOWNLOAD_DIR,
      "temp-all-weeks-countries.tsv"
    );

    // Asegurarse de que la carpeta de descargas existe
    await fs.ensureDir(DOWNLOAD_DIR);

    // Guardar el archivo temporalmente
    const writer = fs.createWriteStream(tempFilePath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", () => resolve(tempFilePath));
      writer.on("error", (err) =>
        reject(`Error saving the file: ${err.message}`)
      );
    });
  } catch (error) {
    throw new Error(`Error downloading the file: ${error.message}`);
  }
};
