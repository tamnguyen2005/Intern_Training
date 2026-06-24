function fakeSearchApi(keyword: string): Promise<string[]> {
  const delay = keyword === "a" ? 1000 : 200;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([`Result for ${keyword}`]);
    }, delay);
  });
}

let results: string[] = [];
let latestRequestId = 0;

async function search(keyword: string) {
  const requestId = ++latestRequestId;

  console.log("start", keyword, requestId);

  const data = await fakeSearchApi(keyword);

  if (requestId !== latestRequestId) {
    console.log("ignore stale response:", keyword);
    return;
  }

  results = data;
  console.log("Current results:", results);
}

search("a");
search("ab");
