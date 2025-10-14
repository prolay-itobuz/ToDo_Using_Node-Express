import * as bootstrap from "bootstrap";
import * as API from "./api.js";
import init from "./displayTasks.js";
import displayTemplates from "./templates.js";

const taskTemplates = new displayTemplates();

//update task operation
const editModal = document.getElementById("exampleModal");
const updateModal = new bootstrap.Modal(editModal);
const toastSection = document.getElementById("toastsection");

async function editTask(taskId) {
  const editTitle = document.getElementById("editTitle");
  const editTags = document.getElementById("editTags");
  const is_important = document.getElementById("editImportant");

  const editModalForm = document.getElementById("editForm");
  editModalForm.setAttribute("data-id", taskId);

  const todo = await API.fetchTodoById(taskId);

  editTitle.value = todo.data.title;
  editTags.value = todo.data.tags;
  is_important.checked = todo.data.isImportant;

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
      } else {
        toastSection.innerHTML = taskTemplates.errorToast(taskData.message);
      }

      init();

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

  if (!todo.data.isImportant) {
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

  if (!todo.data.isCompleted) {
    data.isCompleted = true;
  } else {
    data.isCompleted = false;
  }

  await API.updateTodo(taskId, data);
  init();
}

window.changeStatus = changeStatus;
