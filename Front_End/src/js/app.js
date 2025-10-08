import * as API from "./api.js";
console.log("Welcome to ToDo FrontEnd");

// Display The task Cards
async function init() {
  const searchBox = document.getElementById("searchInput");
  const searchTasks_section = document.getElementById("searchTasks");

  // tasks Buttons toggle
  const radioButtons = document.querySelectorAll('input[name="btnradio"]');

  const importantBtn = document.getElementById("importantBtn");
  const activeButton = document.getElementById("activeButton");
  const completeBtn = document.getElementById("completeBtn");

  //   tasks sections
  const importantTasks_section = document.getElementById("importantTasks");
  const regularTasks_section = document.getElementById("regularTasks");
  const completeTasks_section = document.getElementById("completeTasks");
  const noTask_section = document.getElementById("noTask");

  function hideAllCards() {
    importantTasks_section.classList.add("d-none");
    regularTasks_section.classList.add("d-none");
    completeTasks_section.classList.add("d-none");
  }

  function showSelectedCard() {
    if (importantBtn.checked) {
      hideAllCards();
      importantTasks_section.classList.remove("d-none");
    } else if (activeButton.checked) {
      hideAllCards();
      regularTasks_section.classList.remove("d-none");
    } else if (completeBtn.checkVisibility) {
      hideAllCards();
      completeTasks_section.classList.remove("d-none");
    }
  }

  radioButtons.forEach((radio) => {
    radio.addEventListener("change", showSelectedCard);
  });

  showSelectedCard();

  const tasks = await API.fetchTodos();

  if (tasks.length === 0) {
    noTask_section.classList.remove("d-none");
  }

  for (let i = 0; i < tasks.length; i++) {
    if (!tasks[i].is_completed) {
      if (tasks[i].is_important) {
        importantTasks_section.innerHTML += `<div class="task-manager__task-card task-manager__task-card--important">
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

                        <div class="task-manager__task-tags">
                            ${tasks[i].tags
                              .map(
                                (tag) =>
                                  `<span class="task-manager__task-tag task-manager__tag--others">${tag}</span>`
                              )
                              .join("")}
                        </div>

                        <div class="task-manager__task-actions">
                            <button class="btn task-manager__action-btn task-manager__action-btn--complete" onclick="changeStatus('${
                              tasks[i].id
                            }')">
                                <i class="fa fa-check me-1"></i> Complete
                            </button>
                            <button class="btn task-manager__action-btn task-manager__action-btn--important" onclick="changeImportance('${
                              tasks[i].id
                            }')">
                                <i class="fa fa-star me-1"></i> Not Important
                            </button>
                            <button class="btn task-manager__action-btn task-manager__action-btn--edit" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editTask('${
                              tasks[i].id
                            }')">
                                <i class="fa fa-edit me-1"></i> Edit
                            </button>
                            <button class="btn task-manager__action-btn task-manager__action-btn--delete" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="delTask('${
                              tasks[i].id
                            }')">
                                <i class="fa fa-trash me-1"></i> Delete
                            </button>
                        </div>
                    </div>`;
      } else {
        regularTasks_section.innerHTML += `<div class="task-manager__task-card">
                        <div class="task-manager__task-header">
                            <div>
                                <h4 class="task-manager__task-title">${
                                  tasks[i].title
                                }</h4>
                            </div>
                        </div>

                        <div class="task-manager__task-tags">
                            ${tasks[i].tags
                              .map(
                                (tag) =>
                                  `<span class="task-manager__task-tag task-manager__tag--others">${tag}</span>`
                              )
                              .join("")}
                        </div>

                        <div class="task-manager__task-actions">
                            <button class="btn task-manager__action-btn task-manager__action-btn--complete" onclick="changeStatus('${
                              tasks[i].id
                            }')">
                                <i class="fa fa-check me-1"></i> Complete
                            </button>
                            <button class="btn task-manager__action-btn task-manager__action-btn--important" onclick="changeImportance('${
                              tasks[i].id
                            }')" >
                                <i class="fa fa-star me-1"></i> Important
                            </button>
                            <button class="btn task-manager__action-btn task-manager__action-btn--edit" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editTask('${
                              tasks[i].id
                            }')">
                                <i class="fa fa-edit me-1"></i> Edit
                            </button>
                            <button class="btn task-manager__action-btn task-manager__action-btn--delete" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="delTask('${
                              tasks[i].id
                            }')">
                                <i class="fa fa-trash me-1"></i> Delete
                            </button>
                        </div>
                    </div>`;
      }
    } else {
      completeTasks_section.innerHTML += `<div class="task-manager__task-card task-manager__task-card--completed">
                    <div class="task-manager__task-header">
                        <div>
                            <h4 class="task-manager__task-title task-manager__task-title--completed">${
                              tasks[i].title
                            }</h4>
                        </div>
                    </div>

                    <div class="task-manager__task-tags">
                        ${tasks[i].tags
                          .map(
                            (tag) =>
                              `<span class="task-manager__task-tag task-manager__tag--others">${tag}</span>`
                          )
                          .join("")}
                    </div>

                    <div class="task-manager__task-actions">
                        <button class="btn task-manager__action-btn task-manager__action-btn--complete" onclick="changeStatus('${
                          tasks[i].id
                        }')">
                            <i class="fas fa-undo me-1"></i> Not Complete
                        </button>
                        <button class="btn task-manager__action-btn task-manager__action-btn--delete" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="delTask('${
                          tasks[i].id
                        }')">
                            <i class="fas fa-trash me-1"></i> Delete
                        </button>
                    </div>
                </div>`;
    }
  }
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
      is_important: isImportant,
    };
    await API.addTodo(inputData);
    addForm.reset();
    toastMsg.classList.remove("d-none");
    errMsg.classList.add("d-none");
    taskTitle.classList.remove("border");
    init();
    setTimeout(() => {
      toastMsg.classList.add("d-none");
    }, 1000);
  } else {
    errMsg.classList.remove("d-none");
    taskTitle.classList.add("border");
  }
});



// Button Operations (Update Tasks)
const editForm = document.getElementById("editModal");
editForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  const taskId = editForm.getAttribute("data-id");

  const editTitle = document.getElementById("editTitle");
  const editTags = document.getElementById("editTags");
  const is_important = document.getElementById("editImportant");
  const editErr = document.getElementById("editErr");

  if (!editTitle.value) {
    editTitle.classList.add("border");
    editErr.classList.remove("d-none");
  } else {
    editTitle.classList.remove("border");
    editErr.classList.add("d-none");

    const data = {
      title: editTitle.value,
      tags: editTags.value.split(","),
      is_important: is_important.checked,
    };
    API.updateTodo(taskId, data);
    window.location.reload();
  }
});

// detete task operation
const deleteForm = document.getElementById("delModal");
deleteForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  const temp = deleteForm.getAttribute("data-id");
  console.log(temp);
  await API.deleteTodo(temp);
  window.location.reload();
});

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
