import fs from "fs";
import path from "path";
import { format, createLogger, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const logDirectory = path.resolve("logs");

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

const customFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
  })
);

const dailyRotateTransport = new DailyRotateFile({
  filename: path.join(logDirectory, "application-%DATE%.log"), // Guardar en carpeta "logs"
  datePattern: "YYYY-MM-DD", // Un archivo por día
  maxFiles: "1d", // Mantener solo el archivo actual
  zippedArchive: false, // No comprimir los logs
});

export const logger = createLogger({
  level: process.env.LOG_LEVEL || "info", // Nivel de log (info por defecto)
  format: customFormat,
  transports: [
    new transports.Console(), // Logs a la consola
    dailyRotateTransport, // Logs a archivo con rotación diaria
  ],
});
