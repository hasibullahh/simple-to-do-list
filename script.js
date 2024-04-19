document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const editingOverlay = document.querySelector(".editing-overlay");

    addTaskBtn.addEventListener("click", function() {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            const li = document.createElement("li");
            li.classList.add("task-item");
            li.innerHTML = `
                <span class="task-text">${taskText}</span>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
                <button class="save" style="display:none;">Save</button>
            `;
            taskList.appendChild(li);
            taskInput.value = "";
        }
    });

    taskList.addEventListener("click", function(event) {
        const target = event.target;
        const taskItem = target.closest(".task-item");

        if (target.classList.contains("delete")) {
            taskItem.remove();
        } else if (target.classList.contains("edit")) {
            taskItem.classList.add("editing");
            editingOverlay.style.display = "block";
            taskInput.value = taskItem.querySelector(".task-text").textContent;
            taskItem.querySelector(".task-text").style.display = "none";
            taskItem.querySelector(".edit").style.display = "none";
            taskItem.querySelector(".delete").style.display = "none";
            taskItem.querySelector(".save").style.display = "inline-block";
        } else if (target.classList.contains("save")) {
            taskItem.classList.remove("editing");
            editingOverlay.style.display = "none";
            taskItem.querySelector(".task-text").textContent = taskInput.value.trim();
            taskItem.querySelector(".task-text").style.display = "inline-block";
            taskItem.querySelector(".edit").style.display = "inline-block";
            taskItem.querySelector(".delete").style.display = "inline-block";
            taskItem.querySelector(".save").style.display = "none";
            taskInput.value = "";
        }
    });
});
