import fetchWithRetry from "./function.js";
const quote = document.getElementById("quote");
const fact = document.getElementById("fact");
const user = document.getElementById("user");
const render = (element, data) => {
  if (data) {
    element.classList.remove("skeleton");
    element.textContent =
      typeof data === "object" ? JSON.stringify(data) : data;
  }
};
try {
  var result = await Promise.allSettled([
    fetchWithRetry("https://dummyjson.com/quotes/randomm"),
    fetchWithRetry("https://catfact.ninja/fact"),
    fetchWithRetry("https://jsonplaceholder.typicode.com/users?id=1"),
  ]);
  result.forEach((r) => {
    if (r.status === "rejected") console.log(r.reason);
    else console.log(r.value);
  });
  render(quote, result[0].value);
  render(fact, result[1].value);
  render(user, result[2].value);
} catch (error) {
  console.log("Error !");
}
