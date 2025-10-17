import * as bootstrap from "bootstrap";
import * as API from "../../Api/api.js";
import init from "./displayTasks.js";
import Templates from "../utils/templates.js";

const taskTemplates = new Templates();

// Display The task Cards
init();

// Add Task by Form Submit
addTodoForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  if (taskTitle.value) {
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

    setTimeout(() => {
      toastSection.innerHTML = "";
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

    toastSection.innerHTML = taskTemplates.successToast(
      "Task Successfully deleted."
    );

    setTimeout(() => {
      toastSection.innerHTML = "";
    }, 2000);

    init();
    deleteModal.hide();
  });
}

window.delTask = delTask;
