import * as bootstrap from "bootstrap";
import * as API from "../../Api/api.js";
import init from "./displayTasks.js";
import Templates from "../utils/templates.js";

const taskTemplates = new Templates();
const editModal = document.getElementById("exampleModal");
const updateModal = new bootstrap.Modal(editModal); //update task operation

async function editTask(taskId) {
  editForm.setAttribute("data-id", taskId);
  try {
    const todo = await API.fetchTodoById(taskId);

    editTitle.value = todo.data[0].title;
    editTags.value = todo.data[0].tags;
    editImportant.checked = todo.data[0].isImportant;

    editForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const todoId = editForm.getAttribute("data-id");

      if (!editTitle.value) {
        editTitle.classList.add("border");
        editErr.classList.remove("d-none");
      } else {
        editTitle.classList.remove("border");
        editErr.classList.add("d-none");

        const data = {
          title: editTitle.value,
          tags: editTags.value.split(","),
          isImportant: editImportant.checked,
        };

        const taskData = await API.updateTodo(todoId, data);

        if (taskData.success) {
          toastSection.innerHTML = taskTemplates.successToast(taskData.message);

          init();
        } else {
          toastSection.innerHTML = taskTemplates.errorToast(taskData.message);
        }

        updateModal.hide();
      }
    });
  } catch (err) {
    oastSection.innerHTML = taskTemplates.errorToast(err.message);
  } finally {
    setTimeout(() => {
      toastSection.innerHTML = "";
    }, 2000);
  }
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

  try {
    await API.updateTodo(taskId, data);
    init();
  } catch (err) {
    toastSection.innerHTML = taskTemplates.errorToast(err.message);
  }
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

  try {
    await API.updateTodo(taskId, data);
    init();
  } catch (err) {
    toastSection.innerHTML = taskTemplates.errorToast(err.message);
  }
}

window.changeStatus = changeStatus;
