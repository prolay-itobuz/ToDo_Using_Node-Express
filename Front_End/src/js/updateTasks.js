import * as bootstrap from "bootstrap";
import * as API from "./api.js";
import init from "./displayTasks.js";
import displayTemplates from "./templates.js";

const taskTemplates = new displayTemplates();
const editModal = document.getElementById("exampleModal");
const updateModal = new bootstrap.Modal(editModal); //update task operation
const toastSection = document.getElementById("toastsection");

async function editTask(taskId) {
  const editTitle = document.getElementById("editTitle");
  const editTags = document.getElementById("editTags");
  const is_important = document.getElementById("editImportant");

  const editModalForm = document.getElementById("editForm");
  editModalForm.setAttribute("data-id", taskId);

  const todo = await API.fetchTodoById(taskId);

  editTitle.value = todo.data[0].title;
  editTags.value = todo.data[0].tags;
  is_important.checked = todo.data[0].isImportant;

  editModalForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const editTitle = document.getElementById("editTitle");
    const editTags = document.getElementById("editTags").value;
    const isImportant = document.getElementById("editImportant").checked;
    const editErr = document.getElementById("editErr");
    const todoId = editModalForm.getAttribute("data-id");

    if (!editTitle.value) {
      editTitle.classList.add("border");
      editErr.classList.remove("d-none");
    } else {
      editTitle.classList.remove("border");
      editErr.classList.add("d-none");

      const data = {
        title: editTitle.value,
        tags: editTags.split(","),
        isImportant: isImportant,
      };

      const taskData = await API.updateTodo(todoId, data);

      if (taskData.success) {
        toastSection.innerHTML = taskTemplates.successToast(
          "Task Successfully Updated."
        );

        init();
      } else {
        toastSection.innerHTML = taskTemplates.errorToast(taskData.message);
      }

      setTimeout(() => {
        toastSection.innerHTML = "";
      }, 2000);

      updateModal.hide();
    }
  });
}

window.editTask = editTask;

// Change Important Priority
async function changeImportance(taskId) {
  const todo = await API.fetchTodoById(taskId);
  const data = {};

  if (!todo.data[0].isImportant) {
    data.isImportant = true;
  } else {
    data.isImportant = false;
  }

  await API.updateTodo(taskId, data);
  init();
}

window.changeImportance = changeImportance;

// Change Task Status
async function changeStatus(taskId) {
  const todo = await API.fetchTodoById(taskId);
  const data = {};

  if (!todo.data[0].isCompleted) {
    data.isCompleted = true;
  } else {
    data.isCompleted = false;
  }

  await API.updateTodo(taskId, data);
  init();
}

window.changeStatus = changeStatus;
