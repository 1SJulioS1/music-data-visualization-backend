import { logger } from "../config/winstonConfig.js";

export function handleHttpResponse(response) {
  if (!response || !response.status) {
    const error = new Error("Invalid response: No status code.");
    logger.error(error.message);
    throw error;
  }

  const { status, data } = response;

  if (status >= 200 && status < 300) {
    return data;
  } else if (status >= 400 && status < 500) {
    const error = new Error(
      `Client error (${status}): ${data?.error?.message || "Unknown error"}`
    );
    logger.warn(error.message);
    throw error;
  } else if (status >= 500) {
    const error = new Error(
      `Server error (${status}): ${data?.error?.message || "Unknown error"}`
    );
    logger.error(error.message);
    throw error;
  } else {
    const error = new Error(`Unexpected status code (${status}).`);
    logger.error(error.message);
    throw error;
  }
}
