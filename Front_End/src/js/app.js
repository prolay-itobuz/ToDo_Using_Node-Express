import * as bootstrap from "bootstrap";
import * as API from "./api.js";
import init from "./displayTasks.js";
import editTask from "./updateTasks.js";

console.log("Welcome to ToDo FrontEnd");

// Display The task Cards
init();

// Add Task by Form Submit
const addForm = document.getElementById("addTodo-form");
const toastMsg = document.getElementById("toastMsg");

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
    await API.addTodo(inputData);
    addForm.reset();
    toastMsg.classList.remove("d-none");
    errMsg.classList.add("d-none");
    taskTitle.classList.remove("border");
    init();
    setTimeout(() => {
      toastMsg.classList.add("d-none");
    }, 2000);
  } else {
    errMsg.classList.remove("d-none");
    taskTitle.classList.add("border");
  }
});

// delete task operation
const delModal = document.getElementById("staticBackdrop");
const deleteForm = document.getElementById("delModal");
const deleteModal = new bootstrap.Modal(delModal);

async function handleSubmit(event) {
  event.preventDefault();

  const temp = deleteForm.getAttribute("data-id");
  console.log(temp);
  await API.deleteTodo(temp);

  init();
  deleteModal.hide();
}

deleteForm.addEventListener("submit", handleSubmit);

//search Functionality
const searchBox = document.getElementById("searchInput");
const searchTasks_section = document.getElementById("searchTasks");
const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  // const searchBtn = document.getElementById("searchBtn");
  //   const resetBtn = document.getElementById("resetBtn");
  //   const searchBox = document.getElementById("searchInput");

  //   if (searchBox.value) {
  //     regularTasks_section.classList.add("d-none");
  //     importantTasks_section.classList.add("d-none");
  //     searchBtn.classList.add("d-none");
  //     resetBtn.classList.remove("d-none");
  //     searchTasks_section.classList.remove("d-none");

  //     const query = searchBox.value.toLowerCase();
  //     const tasks = await API.searchData(query);

  //     console.log(tasks);

  //     if (!tasks) {
  //       document.getElementById("nosearch").classList.remove("d-none");
  //     } else {
  //       for (let i = 0; i < tasks.length; i++) {
  //         searchTasks_section.innerHTML += `<div class="task-manager__task-card ${
  //           tasks[i].is_important === true
  //             ? "task-manager__task-card--important"
  //             : "task-manager__task-card"
  //         } ">
  //                         <div class="task-manager__task-header">
  //                             <div>
  //                                 <h4 class="task-manager__task-title">${
  //                                   tasks[i].title
  //                                 }</h4>
  //                                 <span class="task-manager__task-important ${
  //                                   tasks[i].is_important === true ? "" : "d-none"
  //                                 }">
  //                                     <i class="fa fa-exclamation-circle me-1"></i> Important
  //                                 </span>
  //                             </div>
  //                         </div>

  //                         <div class="task-manager__task-tags">
  //                             <span class="task-manager__task-tag task-manager__tag--others ${
  //                               tasks[i].tags === "" ? "d-none" : ""
  //                             } ">${tasks[i].tags}</span>
  //                         </div>

  //                         <div class="task-manager__task-actions">
  //                             <button class="btn task-manager__action-btn task-manager__action-btn--complete" onclick="changeStatus(${
  //                               tasks[i].id
  //                             })">
  //                                 <i class="fa fa-check me-1"></i> Complete
  //                             </button>

  //                             <button class="btn task-manager__action-btn task-manager__action-btn--important ${
  //                               tasks[i].is_important === true ? "" : "d-none"
  //                             }" onclick="changeImportance(${tasks[i].id})">
  //                                 <i class="fa fa-star me-1"></i> Not Important
  //                             </button>
  //                             <button class="btn task-manager__action-btn task-manager__action-btn--important ${
  //                               tasks[i].is_important === true ? "d-none" : ""
  //                             }" onclick="changeImportance(${tasks[i].id})">
  //                                 <i class="fa fa-star me-1"></i> Important
  //                             </button>

  //                             <button class="btn task-manager__action-btn task-manager__action-btn--edit" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editTask(${
  //                               tasks[i].id
  //                             })">
  //                                 <i class="fa fa-edit me-1"></i> Edit
  //                             </button>
  //                             <button class="btn task-manager__action-btn task-manager__action-btn--delete" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="delTask(${
  //                               tasks[i].id
  //                             })">
  //                                 <i class="fa fa-trash me-1"></i> Delete
  //                             </button>
  //                         </div>
  //                     </div>`;
  //       }
  //     }
  //   }
});
