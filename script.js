const newTaskInput = document.getElementById("newTaskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterBtns = document.querySelectorAll(".filter-btn");

// Function to create a new task list item
function createTaskItem(taskText, isCompleted = false, dueDate) {
  const li = document.createElement("li");
  li.classList.add("task-item");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = isCompleted;
  checkbox.addEventListener("change", function() {
    li.classList.toggle("completed");
  });

  const taskTextElement = document.createElement("span");
  taskTextElement.classList.add("task-text");
  taskTextElement.textContent = taskText;

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-btn");
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", function() {
    toggleEditMode(li);
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", function() {
    deleteTask(li);
  });

  const dueDateElement = document.createElement("span");
  dueDateElement.classList.add("due-date");
  if (dueDate) {
    dueDateElement.textContent = `Due: ${dueDate}`;
  }

  li.appendChild(checkbox);
  li.appendChild(taskTextElement);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  if (dueDate) {
    li.appendChild(dueDateElement);
  }

  return li;
}

// Function to toggle edit mode for a task
function toggleEditMode(taskItem) {
  const taskTextElement = taskItem.querySelector(".task-text");
  const editBtn = taskItem.querySelector(".edit-btn");

  taskTextElement.contentEditable = taskTextElement.contentEditable === "true" ? "false" : "true";
  editBtn.textContent = taskTextElement.contentEditable === "true" ? "Save" : "Edit";

  // Set focus on task text element when entering edit mode
  if (taskTextElement.contentEditable === "true") {
    taskTextElement.focus();
  }
}

// Function to delete a task
function deleteTask(taskItem) {
  taskList.removeChild(taskItem);
}

// Function to add a new task (handles Enter key press)
function addNewTask() {
  const taskText = newTaskInput.value.trim();
  if (taskText !== "") {
    const newTaskItem = createTaskItem(taskText);
    taskList.appendChild(newTaskItem);
    newTaskInput.value = "";
  }
}

// Event listener for adding new tasks (handles both click and Enter)
addTaskBtn.addEventListener("click", addNewTask);
newTaskInput.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) { // Enter key code
    addNewTask();
  }
});
// Function to filter tasks based on "All," "Completed," or "Pending"
function filterTasks(filterValue) {
    const allTasks = taskList.querySelectorAll(".task-item");
    allTasks.forEach(task => {
      const isCompleted = task.classList.contains("completed");
      if (filterValue === "all") {
        task.style.display = "flex";
      } else if (filterValue === "completed" && isCompleted) {
        task.style.display = "flex";
      } else if (filterValue === "pending" && !isCompleted) {
        task.style.display = "flex";
      } else {
        task.style.display = "none";
      }
    });
  }
  
  // Initial display of all tasks
  filterTasks("all");
  
  // Event listener for filtering tasks
  filterBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      const filterValue = this.dataset.filter;
      filterTasks(filterValue);
      // Update active class for selected button
      filterBtns.forEach(fBtn => fBtn.classList.remove("active"));
      this.classList.add("active");
    });
  });
  