let task = [];
export const render = (list, count, currentFilter) => {
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
  });
  const taskCount = filteredTask.length;
  count.textContent = `Có ${taskCount} task`;
};
export const handleTask = (input, list, count, currentFilter) => {
  const content = input.value.trim();
  if (content === "") return;
  const newTask = {
    id: Date.now(),
    name: content,
    isCompleted: false,
  };
  task.push(newTask);
  input.value = "";
  render(list, count, currentFilter);
};
export const handleList = (target, taskId, list, count, currentFilter) => {
  if (target.classList.contains("delete-btn")) {
    task = task.filter((t) => t.id !== taskId);
  }
  if (target.classList.contains("task-text")) {
    task = task.map((t) =>
      t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t,
    );
  }
  render(list, count, currentFilter);
};
