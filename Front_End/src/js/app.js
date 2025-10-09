import * as bootstrap from "bootstrap";
import * as API from "./api.js";
console.log("Welcome to ToDo FrontEnd");

// Display The task Cards
export default async function init() {
  console.log("Init Called");
  const searchBox = document.getElementById("searchInput");
  const searchTasks_section = document.getElementById("searchTasks");

  // tasks Buttons toggle
  const radioButtons = document.querySelectorAll('input[name="btnradio"]');

  const importantBtn = document.getElementById("importantBtn");
  const activeButton = document.getElementById("activeButton");
  const completeBtn = document.getElementById("completeBtn");
  const allBtn = document.getElementById("allBtn");

  //   tasks sections
  const importantTasks_section = document.getElementById("importantTasks");
  const regularTasks_section = document.getElementById("regularTasks");
  const completeTasks_section = document.getElementById("completeTasks");
  const allTasks_section = document.getElementById("allTasks");

  function hideAllCards() {
    completeTasks_section.classList.add("d-none");
    importantTasks_section.classList.add("d-none");
    regularTasks_section.classList.add("d-none");
    allTasks_section.classList.add("d-none");
  }

  function showSelectedCard() {
    if (importantBtn.checked) {
      hideAllCards();
      importantTasks_section.classList.remove("d-none");
    } else if (activeButton.checked) {
      hideAllCards();
      regularTasks_section.classList.remove("d-none");
    } else if (completeBtn.checked) {
      hideAllCards();
      completeTasks_section.classList.remove("d-none");
    } else if (allBtn.checked) {
      hideAllCards();
      allTasks_section.classList.remove("d-none");
    }
  }

  radioButtons.forEach((radio) => {
    radio.addEventListener("change", showSelectedCard);
  });

  importantTasks_section.innerHTML = "";
  regularTasks_section.innerHTML = "";
  completeTasks_section.innerHTML = "";
  allTasks_section.innerHTML = "";

  const tasks = await API.fetchTodos();

  let completeCount = 0,
    activeCount = 0,
    allCount = 0,
    importantCount = 0;

  for (let i = 0; i < tasks.length; i++) {
    let impHTML = `<div class="task-manager__task-card task-manager__task-card--important">
                        <div class="task-manager__task-header">
                            <div>
                                <h4 class="task-manager__task-title">${
                                  tasks[i].title
                                }</h4>
                                <span class="task-manager__task-important">
                                    <i class="fa fa-exclamation-circle me-1"></i> Important
                                </span>
                            </div>
                        </div>

                        <div class="task-manager__task-tags ${
                          tasks[i].tags[0] == "" ? "d-none" : ""
                        }">
                            ${tasks[i].tags
                              .map(
                                (tag) =>
                                  `<span class="task-manager__task-tag task-manager__tag--others">${tag}</span>`
                              )
                              .join("")}
                        </div>

                        <div class="task-manager__task-actions">
                            <button class="btn task-manager__action-btn task-manager__action-btn--complete" onclick="changeStatus('${
                              tasks[i]._id
                            }')">
                                <i class="fa fa-check me-1"></i> Complete
                            </button>
                            <button class="btn task-manager__action-btn task-manager__action-btn--important" onclick="changeImportance('${
                              tasks[i]._id
                            }')">
                                <i class="fa fa-star me-1"></i> Not Important
                            </button>
                            <button class="btn task-manager__action-btn task-manager__action-btn--edit" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editTask('${
                              tasks[i]._id
                            }')">
                                <i class="fa fa-edit me-1"></i> Edit
                            </button>
                            <button class="btn task-manager__action-btn task-manager__action-btn--delete" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="delTask('${
                              tasks[i]._id
                            }')">
                                <i class="fa fa-trash me-1"></i> Delete
                            </button>
                        </div>
                    </div>`;
    let activeHTML = `<div class="task-manager__task-card">
                        <div class="task-manager__task-header">
                            <div>
                                <h4 class="task-manager__task-title">${
                                  tasks[i].title
                                }</h4>
                            </div>
                        </div>
                        <div class="task-manager__task-tags ${
                          tasks[i].tags[0] == "" ? "d-none" : ""
                        }">
                            ${tasks[i].tags
                              .map(
                                (tag) =>
                                  `<span class="task-manager__task-tag task-manager__tag--others">${tag}</span>`
                              )
                              .join("")}
                        </div>

                        <div class="task-manager__task-actions">
                            <button class="btn task-manager__action-btn task-manager__action-btn--complete" onclick="changeStatus('${
                              tasks[i]._id
                            }')">
                                <i class="fa fa-check me-1"></i> Complete
                            </button>
                            <button class="btn task-manager__action-btn task-manager__action-btn--important" onclick="changeImportance('${
                              tasks[i]._id
                            }')" >
                                <i class="fa fa-star me-1"></i> Important
                            </button>
                            <button class="btn task-manager__action-btn task-manager__action-btn--edit" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editTask('${
                              tasks[i]._id
                            }')">
                                <i class="fa fa-edit me-1"></i> Edit
                            </button>
                            <button class="btn task-manager__action-btn task-manager__action-btn--delete" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="delTask('${
                              tasks[i]._id
                            }')">
                                <i class="fa fa-trash me-1"></i> Delete
                            </button>
                        </div>
                    </div>`;
    let completeHTML = `<div class="task-manager__task-card task-manager__task-card--completed">
                    <div class="task-manager__task-header">
                        <div>
                            <h4 class="task-manager__task-title task-manager__task-title--completed">${
                              tasks[i].title
                            }</h4>
                        </div>
                    </div>

                    <div class="task-manager__task-tags ${
                      tasks[i].tags[0] == "" ? "d-none" : ""
                    }">
                        ${tasks[i].tags
                          .map(
                            (tag) =>
                              `<span class="task-manager__task-tag task-manager__tag--others">${tag}</span>`
                          )
                          .join("")}
                    </div>

                    <div class="task-manager__task-actions">
                        <button class="btn task-manager__action-btn task-manager__action-btn--complete" onclick="changeStatus('${
                          tasks[i]._id
                        }')">
                            <i class="fas fa-undo me-1"></i> Not Complete
                        </button>
                        <button class="btn task-manager__action-btn task-manager__action-btn--delete" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="delTask('${
                          tasks[i]._id
                        }')">
                            <i class="fas fa-trash me-1"></i> Delete
                        </button>
                    </div>
                </div>`;

    if (!tasks[i].isCompleted) {
      allCount += 1;
      if (tasks[i].isImportant) {
        importantCount += 1;

        importantTasks_section.innerHTML += impHTML;
        allTasks_section.innerHTML += impHTML;
      } else {
        activeCount += 1;

        regularTasks_section.innerHTML += activeHTML;
        allTasks_section.innerHTML += activeHTML;
      }
    } else {
      completeCount += 1;
      completeTasks_section.innerHTML += completeHTML;
    }
  }
  if (!completeCount) {
    completeTasks_section.innerHTML = `<div class="task-manager__empty-state p-0" id="noTask">
          <div class="task-manager__empty-icon">
            <i class="fa-solid fa-check-circle"></i>
          </div>
          <h5>No Complete Tasks.</h5>
          <p>Add a new task to get started</p>
        </div>`;
  }
  if (!importantCount) {
    importantTasks_section.innerHTML = `<div class="task-manager__empty-state p-0" id="noTask">
          <div class="task-manager__empty-icon">
            <i class="fa-solid fa-clipboard-list"></i>
          </div>
          <h5>No Important tasks.</h5>
          <p>Add a new task to get started</p>
        </div>`;
  }
  if (!activeCount) {
    regularTasks_section.innerHTML = `<div class="task-manager__empty-state p-0" id="noTask">
          <div class="task-manager__empty-icon">
            <i class="fa-solid fa-clipboard-list"></i>
          </div>
          <h5>No active tasks.</h5>
          <p>Add a new task to get started</p>
        </div>`;
  }

  if (!allCount) {
    allTasks_section.innerHTML = `<div class="task-manager__empty-state p-0" id="noTask">
          <div class="task-manager__empty-icon">
            <i class="fa-solid fa-clipboard-list"></i>
          </div>
          <h5>No tasks found.</h5>
          <p>Add a new task to get started</p>
        </div>`;
  }
  showSelectedCard();
}

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

//update task operation
const editModal = document.getElementById("exampleModal");
const updateModal = new bootstrap.Modal(editModal);
const editModalForm = document.getElementById("editForm");

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
    await API.updateTodo(todoId, data);
    init();
    updateModal.hide();
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
// const searchForm = document.getElementById("searchForm")
// searchForm.addEventListener("submit", async function (event) {
//     event.preventDefault();

//     const searchBtn = document.getElementById("searchBtn")
//     const resetBtn = document.getElementById("resetBtn")

//     if (searchBox.value) {
//         regularTasks_section.classList.add('d-none')
//         importantTasks_section.classList.add('d-none')
//         searchBtn.classList.add('d-none')
//         resetBtn.classList.remove('d-none')
//         searchTasks_section.classList.remove('d-none')

//         const query = searchBox.value.toLowerCase();
//         const tasks = await API.searchData(query)

//         console.log(tasks)

//         if (!tasks) {
//             document.getElementById("nosearch").classList.remove("d-none")
//         }
//         else {
//             for (let i = 0; i < tasks.length; i++) {
//                 searchTasks_section.innerHTML += `<div class="task-manager__task-card ${tasks[i].is_important === true ? 'task-manager__task-card--important' : 'task-manager__task-card'} ">
//                         <div class="task-manager__task-header">
//                             <div>
//                                 <h4 class="task-manager__task-title">${tasks[i].title}</h4>
//                                 <span class="task-manager__task-important ${tasks[i].is_important === true ? '' : 'd-none'}">
//                                     <i class="fa fa-exclamation-circle me-1"></i> Important
//                                 </span>
//                             </div>
//                         </div>

//                         <div class="task-manager__task-tags">
//                             <span class="task-manager__task-tag task-manager__tag--others ${tasks[i].tags === '' ? 'd-none' : ''} ">${tasks[i].tags}</span>
//                         </div>

//                         <div class="task-manager__task-actions">
//                             <button class="btn task-manager__action-btn task-manager__action-btn--complete" onclick="changeStatus(${tasks[i].id})">
//                                 <i class="fa fa-check me-1"></i> Complete
//                             </button>

//                             <button class="btn task-manager__action-btn task-manager__action-btn--important ${tasks[i].is_important === true ? '' : 'd-none'}" onclick="changeImportance(${tasks[i].id})">
//                                 <i class="fa fa-star me-1"></i> Not Important
//                             </button>
//                             <button class="btn task-manager__action-btn task-manager__action-btn--important ${tasks[i].is_important === true ? 'd-none' : ''}" onclick="changeImportance(${tasks[i].id})">
//                                 <i class="fa fa-star me-1"></i> Important
//                             </button>

//                             <button class="btn task-manager__action-btn task-manager__action-btn--edit" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editTask(${tasks[i].id})">
//                                 <i class="fa fa-edit me-1"></i> Edit
//                             </button>
//                             <button class="btn task-manager__action-btn task-manager__action-btn--delete" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="delTask(${tasks[i].id})">
//                                 <i class="fa fa-trash me-1"></i> Delete
//                             </button>
//                         </div>
//                     </div>`
//             }
//         }
//     }
// });
