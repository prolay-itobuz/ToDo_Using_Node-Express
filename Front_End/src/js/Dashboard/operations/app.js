import * as bootstrap from "bootstrap";
import * as API from "../../Api/api.js";
import init from "./displayTasks.js";
import Templates from "../utils/templates.js";

const taskTemplates = new Templates();

const addTodoForm = document.getElementById("addTodoForm");
const taskTitle = document.getElementById("taskTitle");
const taskTags = document.getElementById("taskTags");
const isImportant = document.getElementById("isImportant");
const toastSection = document.getElementById("toastSection");
const errMsg = document.getElementById("errMsg");

// Display The task Cards
init();

// Add Task by Form Submit
addTodoForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  if (taskTitle.value) {
    try {
      const tagContainer = taskTags.value.split(",");
      const inputData = {
        title: taskTitle.value,
        tags: tagContainer,
        isImportant: isImportant.checked,
      };

      const data = await API.addTodo(inputData);
      addTodoForm.reset();

      if (data.success) {
        toastSection.innerHTML = taskTemplates.successToast(data.message);
      } else {
        toastSection.innerHTML = taskTemplates.errorToast(data.message);
      }

      errMsg.classList.add("d-none");
      taskTitle.classList.remove("border");

      init();
    } catch (err) {
      toastSection.innerHTML = taskTemplates.errorToast(err.message);
    } finally {
      setTimeout(() => {
        toastSection.innerHTML = "";
      }, 2000);
    }
  } else {
    errMsg.classList.remove("d-none");
    taskTitle.classList.add("border");
  }
});

// delete task operation
const delModal = document.getElementById("staticBackdrop");
const deleteModal = new bootstrap.Modal(delModal);

function delTask(taskId) {
  const deleteForm = document.getElementById("delModal");
  deleteForm.setAttribute("data-id", taskId);

  deleteForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const temp = deleteForm.getAttribute("data-id");
    try {
      const deletedTask = await API.deleteTodo(temp);

      if (deletedTask.success) {
        toastSection.innerHTML = taskTemplates.successToast(
          deletedTask.message
        );
      } else {
        toastSection.innerHTML = taskTemplates.errorToast(deletedTask.message);
      }
    } catch (err) {
      toastSection.innerHTML = taskTemplates.errorToast(err.message);
    } finally {
      setTimeout(() => {
        toastSection.innerHTML = "";
      }, 2000);

      init();
      deleteModal.hide();
    }
  });
}

window.delTask = delTask;
