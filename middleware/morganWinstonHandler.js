import morgan from "morgan";
import { logger } from "../config/winstonConfig.js"; // Tu configuración de Winston

// Configuración de Morgan con Winston
const stream = {
  write: (message) => logger.info(message.trim()), // Registrar cada solicitud
};

export const requestLogger = morgan("combined", { stream });
