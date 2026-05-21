const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const fetchWithRetry = async (url, retryLeft = 3, delay = 1000) => {
  if (retryLeft <= 0) {
    throw new Error(`Failed to fetch after multiple retries for: ${url}`);
  }
  try {
    if (delay > 1000) {
      await sleep(delay);
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.log(`Only ${retryLeft - 1} left`);
    return await fetchWithRetry(url, retryLeft - 1, delay * 2);
  }
};
export default fetchWithRetry;
