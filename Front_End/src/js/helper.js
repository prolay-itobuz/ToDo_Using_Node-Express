export default class manageDisplay {
  hideAllCards = () => {
    document.getElementById("completeTasks").classList.add("d-none");
    document.getElementById("importantTasks").classList.add("d-none");
    document.getElementById("regularTasks").classList.add("d-none");
    document.getElementById("allTasks").classList.add("d-none");
  };

  showSelectedCard = () => {
    const importantBtn = document.getElementById("importantBtn");
    const activeButton = document.getElementById("activeButton");
    const completeBtn = document.getElementById("completeBtn");
    const allBtn = document.getElementById("allBtn");

    if (importantBtn.checked) {
      this.hideAllCards();
      document.getElementById("importantTasks").classList.remove("d-none");
    } else if (activeButton.checked) {
      this.hideAllCards();
      document.getElementById("regularTasks").classList.remove("d-none");
    } else if (completeBtn.checked) {
      this.hideAllCards();
      document.getElementById("completeTasks").classList.remove("d-none");
    } else if (allBtn.checked) {
      this.hideAllCards();
      document.getElementById("allTasks").classList.remove("d-none");
    }
  };
}
