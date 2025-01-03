import fs from "fs";
export async function getFlagByRegion(req, res, next) {
  try {
    const { regionCode } = req.params;
    const filePath = `assets/official-ratio-120px/${regionCode}.png`; // or any file format

    // Check if file specified by the filePath exists
    if (fs.existsSync(filePath)) {
      // Content-type is very interesting part that guarantee that
      // Web browser will handle response in an appropriate manner.
      res.writeHead(200, {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": "attachment; filename=" + regionCode + ".png",
      });
      fs.createReadStream(filePath).pipe(res);
      return;
    }
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("ERROR File does not exist");
  } catch (error) {
    next(error);
  }
}
