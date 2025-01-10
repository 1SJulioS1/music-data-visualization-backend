export async function withRetries(task, maxRetries = 5, delay = 30000) {
  let retries = 0;
  while (retries < maxRetries) {
    try {
      return await task();
    } catch (error) {
      console.error(`Error on attempt ${retries + 1}: ${error.message}`);
      retries++;
      if (retries >= maxRetries) {
        throw new Error(`Task failed after ${maxRetries} retries`);
      }
      console.info(`Retrying... (${retries}/${maxRetries})`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}
