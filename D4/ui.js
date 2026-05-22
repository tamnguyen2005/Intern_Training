import { render, handleList, handleTask } from "./function.js";

const input = document.getElementById("task-input");
const btn = document.getElementById("task-btn");
const list = document.getElementById("task-list");
const count = document.getElementById("task-count");
const filtersContainer = document.getElementById("type-container");
// const type = document.getElementsByClassName("task-type");
let currentFilter = "All";
list.addEventListener("click", (event) => {
  const target = event.target;
  const li = target.closest("li");
  if (!li) return;
  const taskId = Number(li.dataset.id);
  handleList(target, taskId, list, count, currentFilter);
});
filtersContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("task-type")) {
    currentFilter = event.target.getAttribute("data-value");
    render(list, count, currentFilter);
  }
});
btn.addEventListener("click", () => {
  handleTask(input, list, count, currentFilter);
});
render(list, count, currentFilter);
