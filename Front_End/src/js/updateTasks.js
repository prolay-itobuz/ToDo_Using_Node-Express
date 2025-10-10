import * as bootstrap from "bootstrap";
import * as API from "./api.js";
import init from "./displayTasks.js";

//update task operation
export default async function editTask(taskId) {
  const editModalForm = document.getElementById("editForm");
  editModalForm.setAttribute("data-id", taskId);
  const editTitle = document.getElementById("editTitle");
  const editTags = document.getElementById("editTags");
  const is_important = document.getElementById("editImportant");
  const editModal = document.getElementById("exampleModal");
  const updateModal = new bootstrap.Modal(editModal);

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
      await API.updateTodo(todoId, data);
      init();
      updateModal.hide();
    }
  });
}

window.editTask = editTask;
