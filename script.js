const addBtn = document.getElementById("add-btn");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
let tasks = [];
tasks.forEach((task) => {
  taskList.append(createItem(task));
});
taskInput.focus();

taskList.addEventListener("change", (e) => {
  if (e.target.classList.contains("complete")) {
    const li = e.target.closest("li");
    if (!li) return;
    li.classList.toggle("done");
  }
})

taskList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const li = e.target.closest("li");
    if (!li) return;
    const id = +li.dataset.id;
    deleteItem(li, id);
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

  const task = { id: Date.now(), text: taskText };
  tasks.push(task);
  taskList.append(createItem(task));
  taskInput.value = "";
}

function deleteItem(item, id) {
  item.remove();
  tasks = tasks.filter((t) => t.id !== id);
}

function createItem(task) {
  const li = document.createElement("li");
  li.dataset.id = task.id;

  const span = document.createElement("span");
  span.textContent = task.text;
  span.className = "task-text";

  const actions = document.createElement("div");
  actions.className = "actions";
  actions.append(
    createCompleteAction("complete"),
    createDeleteAction("delete")
  );

  li.append(span, actions);
  return li;
}
function createCompleteAction() {
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.className = "complete";
  return checkBox;
}
function createDeleteAction() {
  const button = document.createElement("button");
  button.className = "delete";
  button.textContent = "Delete";
  return button;
}
