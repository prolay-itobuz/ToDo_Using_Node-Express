const completeTasks = document.getElementById("completeTasks");
const importantTasks = document.getElementById("importantTasks");
const regularTasks = document.getElementById("regularTasks");
const allTasks = document.getElementById("allTasks");
const searchTasks = document.getElementById("searchTasks");
const importantBtn = document.getElementById("importantBtn");
const activeButton = document.getElementById("activeButton");
const completeBtn = document.getElementById("completeBtn");
const allBtn = document.getElementById("allBtn");

export default class Helper {
  hideAllCards = () => {
    completeTasks.classList.add("d-none");
    importantTasks.classList.add("d-none");
    regularTasks.classList.add("d-none");
    allTasks.classList.add("d-none");
    searchTasks.classList.add("d-none");
  };

  showSelectedCard = () => {
    if (importantBtn.checked) {
      this.hideAllCards();

      importantTasks.classList.remove("d-none");
    } else if (activeButton.checked) {
      this.hideAllCards();

      regularTasks.classList.remove("d-none");
    } else if (completeBtn.checked) {
      this.hideAllCards();

      completeTasks.classList.remove("d-none");
    } else if (allBtn.checked) {
      this.hideAllCards();

      allTasks.classList.remove("d-none");
    }
  };

  option = (method, todo = null) => {
    const data = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (todo) {
      data.body = JSON.stringify(todo);
    }

    return data;
  };

  fileUpload = (method, file) => {
    const data = {
      method: method,
      headers: {},
    };

    data.body = file;
    return data;
  };
}
