export default class displayTemplates {
  showImportant = (tasks, i) => {
    return `<div class="task-manager__task-card task-manager__task-card--important">
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
  };

  showActive = (tasks, i) => {
    return `<div class="task-manager__task-card">
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
  };

  showComplete = (tasks, i) => {
    return `<div class="task-manager__task-card task-manager__task-card--completed">
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
  };

  emptyComplete = () => {
    return `<div class="task-manager__empty-state p-0" id="noTask">
          <div class="task-manager__empty-icon">
            <i class="fa-solid fa-check-circle"></i>
          </div>
          <h5>No Complete Tasks.</h5>
          <p>Add a new task to get started</p>
        </div>`;
  };

  emptyImportant = () => {
    return `<div class="task-manager__empty-state p-0" id="noTask">
          <div class="task-manager__empty-icon">
            <i class="fa-solid fa-clipboard-list"></i>
          </div>
          <h5>No Important tasks.</h5>
          <p>Add a new task to get started</p>
        </div>`;
  };

  emptyActive = () => {
    return `<div class="task-manager__empty-state p-0" id="noTask">
          <div class="task-manager__empty-icon">
            <i class="fa-solid fa-clipboard-list"></i>
          </div>
          <h5>No active tasks.</h5>
          <p>Add a new task to get started</p>
        </div>`;
  };

  emptyAll = () => {
    return `<div class="task-manager__empty-state p-0" id="noTask">
          <div class="task-manager__empty-icon">
            <i class="fa-solid fa-clipboard-list"></i>
          </div>
          <h5>No tasks found.</h5>
          <p>Add a new task to get started</p>
        </div>`;
  };

  successToastInsertion = () =>{
    return `  <div class="toast text-bg-success d-flex justify-content-center align-items-center p-2 gap-2" id="toastMsg">
    <i class="fa fa-check-circle"></i>
    <p class="m-0">Task Successfully added.</p>
  </div>`;
  };

  successToastDeletion = () =>{
    return  `  <div class="toast text-bg-success d-flex justify-content-center align-items-center p-2 gap-2" id="toastMsg">
    <i class="fa fa-check-circle"></i>
    <p class="m-0">Task Successfully deleted.</p>
  </div>`;
  }

  successToastUpdated = () =>{
    return `  <div class="toast text-bg-success d-flex justify-content-center align-items-center p-2 gap-2" id="toastMsg">
    <i class="fa fa-check-circle"></i>
    <p class="m-0">Task Successfully Updated.</p>
  </div>`;
  };

  errorToast = (msg) => {
    return `  <div class="toast text-bg-danger d-flex justify-content-center align-items-center p-2 gap-2" id="toastMsg">
    <i class="fa fa-times-circle"></i>
    <p class="m-0">${msg}</p>
  </div>`;
  };

  emptySearch = () =>{
    return `<div class="task-manager__empty-state p-0" id="nosearch">
          <div class="task-manager__empty-icon">
            <i class="fa-solid fa-clipboard-list"></i>
          </div>
          <h5>No Result found</h5>
          <p>Reset and search again for result.</p>
        </div>`;
  };

}
