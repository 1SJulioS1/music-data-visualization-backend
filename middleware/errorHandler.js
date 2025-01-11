import { logger } from "../config/winstonConfig.js";
export function errorHandler(err, req, res, next) {
  logger.error("Error ", {
    message: err.message,
    stack: err.stack,
    status: err.status || 500,
    route: req.originalUrl,
    method: req.method,
  });

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    error: {
      status,
      message,
    },
  });
}
