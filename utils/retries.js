import { logger } from "../config/winstonConfig.js";
export async function withRetries(task, options = {}) {
  const {
    maxRetries = 5,
    initialDelay = 1000,
    maxDelay = 30000,
    timeout = null,
    isRecoverable = (error) => true,
  } = options;
  let retries = 0;
  let delay = initialDelay;
  const startTime = Date.now();
  while (retries < maxRetries) {
    try {
      return await task();
    } catch (error) {
      retries++;
      if (!isRecoverable(error)) {
        logger.error(`Task failed: ${error.message}`);
      }
      if (timeout && Date.now() - startTime > timeout) {
        logger.error(`Task exceeded total timeout of ${timeout}ms`);
      }
      if (retries >= maxRetries) {
        logger.error(`Task failed after ${retries} retries: ${error.message}`);
      }
      logger.warn(
        `Retrying... (${retries}/${maxRetries}) after ${delay}ms: ${error.message}`
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
      delay = Math.min(delay * 2, maxDelay);
    }
  }
}
