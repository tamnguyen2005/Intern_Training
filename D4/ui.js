const input = document.getElementById("task-input");
const btn = document.getElementById("task-btn");
const list = document.getElementById("task-list");
const count = document.getElementById("task-count");
const filtersContainer = document.getElementById("type-container");
// const type = document.getElementsByClassName("task-type");
let task = [];
let currentFilter = "All";
const render = () => {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  const filteredTask = task.filter((t) => {
    if (currentFilter === "active") return !t.isCompleted;
    if (currentFilter === "completed") return t.isCompleted;
    return true;
  });
  filteredTask.forEach((t) => {
    const li = document.createElement("li");
    li.dataset.id = t.id;
    const span = document.createElement("span");
    span.classList.add("task-text");
    span.textContent = t.name;
    if (t.isCompleted) {
      span.style.textDecoration = "line-through";
      span.style.opacity = 0.6;
    }
    const del = document.createElement("button");
    del.classList.add("delete-btn");
    del.textContent = "Delete";
    li.appendChild(span);
    li.appendChild(del);
    list.appendChild(li);
    const taskCount = filteredTask.filter((t) => !t.isCompleted).length;
    count.textContent = `Còn ${taskCount} task`;
  });
};
list.addEventListener("click", (event) => {
  const target = event.target;
  const li = target.closest("li");
  if (!li) return;
  const taskId = Number(li.dataset.id);
  console.log(taskId);
  if (target.classList.contains("delete-btn")) {
    task = task.filter((t) => t.id !== taskId);
    render();
  }
  if (target.classList.contains("task-text")) {
    task = task.map((t) =>
      t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t,
    );
    render();
  }
});
filtersContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("task-type")) {
    currentFilter = event.target.getAttribute("data-value");
    render();
  }
});
const handleTask = () => {
  const content = input.value.trim();
  if (content === "") return;
  const newTask = {
    id: Date.now(),
    name: content,
    isCompleted: false,
  };
  task.push(newTask);
  input.value = "";
  render();
};
btn.addEventListener("click", handleTask);
render();
