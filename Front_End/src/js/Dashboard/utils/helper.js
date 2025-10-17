export default class manageDisplay {
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
}
