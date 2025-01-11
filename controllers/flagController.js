import fs from "fs/promises";
import path from "path";
import { logger } from "../config/winstonConfig.js";

export async function getFlagByRegion(req, res, next) {
  try {
    const { regionCode } = req.params;
    const filePath = path.resolve(
      `assets/official-ratio-120px/${regionCode}.png`
    );

    try {
      await fs.access(filePath);
    } catch {
      logger.warn(`File not found for region code: ${regionCode}`);
      return res.status(404).json({ error: "File does not exist" });
    }

    res.set({
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${regionCode}.png"`,
    });

    res.sendFile(filePath, (err) => {
      if (err) {
        logger.error(
          `Error sending file for region code ${regionCode}: ${err.message}`
        );
        next(err);
      }
    });
  } catch (error) {
    logger.error(`Unexpected error in getFlagByRegion: ${error.message}`);
    next(error);
  }
}
