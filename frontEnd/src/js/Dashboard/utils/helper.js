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
