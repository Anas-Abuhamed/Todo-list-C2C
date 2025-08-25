let tasks = [];
const addBtn = document.getElementById("add-btn");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
document.addEventListener("DOMContentLoaded", () => {
  tasks = getTasksFromLocalStorage();
  tasks.forEach((task) => {
    taskList.append(createItem(task));
  });
  taskInput.focus();
})

taskList.addEventListener("change", (e) => {
  if (e.target.classList.contains("complete")) {
    const li = e.target.closest("li");
    if (!li) return;
    li.classList.toggle("done");
    const id = +li.dataset.id;
    const task = tasks.find((t) => t.id === id);
    if (task) {
      task.done = !task.done;
      saveTasksToLocalStorage(tasks);
    }
  }
})

taskList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const li = e.target.closest("li");
    if (!li) return;
    const id = +li.dataset.id;
    deleteItem(li, id);
    saveTasksToLocalStorage(tasks);
  }
})

addBtn.addEventListener("click", addItem);
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addItem();
  else if (e.key === "Escape") taskInput.value = "";
});

function addItem() {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  const task = { id: Date.now(), text: taskText, done: false };
  tasks.push(task);
  taskList.append(createItem(task));
  taskInput.value = "";
  saveTasksToLocalStorage(tasks);
}

function deleteItem(item, id) {
  item.remove();
  tasks = tasks.filter((t) => t.id !== id);
}

function createItem(task) {
  const li = document.createElement("li");
  li.dataset.id = task.id;
  if (task.done)
    li.classList.add("done");

  const span = document.createElement("span");
  span.textContent = task.text;
  span.className = "task-text";

  const actions = document.createElement("div");
  actions.className = "actions";
  actions.append(
    createCompleteAction(task.done),
    createDeleteAction("delete")
  );

  li.append(span, actions);
  return li;
}
function createCompleteAction(done) {
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.className = "complete";
  checkBox.checked = done;
  return checkBox;
}
function createDeleteAction() {
  const button = document.createElement("button");
  button.className = "delete";
  button.textContent = "Delete";
  return button;
}

function getTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  return tasks;
}
function saveTasksToLocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
