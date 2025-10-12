import * as bootstrap from "bootstrap";
import * as API from "./api.js";
import init from "./displayTasks.js";
import displayTemplates from "./templates.js";

const taskTemplates = new displayTemplates();

// Display The task Cards
init();

// Add Task by Form Submit
const addForm = document.getElementById("addTodo-form");
const toastSection = document.getElementById("toastsection");

addForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const taskTitle = document.getElementById("taskTitle");
  const errMsg = document.getElementById("errMsg");
  const isImportant = document.getElementById("isImportant").checked;
  const taskTags = document.getElementById("taskTags").value;

  if (taskTitle.value) {
    const tagContainer = taskTags.split(",");
    const inputData = {
      title: taskTitle.value,
      tags: tagContainer,
      isImportant: isImportant,
    };

    const data = await API.addTodo(inputData);
    addForm.reset();

    if (data.success) {
      toastSection.innerHTML = taskTemplates.successToastInsertion();
    }
    else {
      toastSection.innerHTML = taskTemplates.errorToast(data.message);
    }

    errMsg.classList.add("d-none");
    taskTitle.classList.remove("border");

    init();

    setTimeout(() => {
      toastSection.innerHTML = ''
    }, 2000);

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
    await API.deleteTodo(temp);

    toastSection.innerHTML = taskTemplates.successToastDeletion();


    setTimeout(() => {
      toastSection.innerHTML = ''
    }, 2000);

    init();
    deleteModal.hide();
  });
}

window.delTask = delTask;
