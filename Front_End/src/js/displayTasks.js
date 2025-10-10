// Display The task Cards
import * as API from "./api.js";
import displayTemplates from "./templates.js";
import manageDisplay from "./helper.js";

const taskTemplates = new displayTemplates();
const helper = new manageDisplay();

export default async function init() {
  // tasks Buttons toggle
  const radioButtons = document.querySelectorAll('input[name="btnradio"]');

  // tasks sections
  const importantTasks_section = document.getElementById("importantTasks");
  const regularTasks_section = document.getElementById("regularTasks");
  const completeTasks_section = document.getElementById("completeTasks");
  const allTasks_section = document.getElementById("allTasks");

  helper.showSelectedCard();

  radioButtons.forEach((radio) => {
    radio.addEventListener("change", helper.showSelectedCard);
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

  for (let i = 0; i < tasks.data.length; i++) {
    if (!tasks.data[i].isCompleted) {
      allCount += 1;
      if (tasks.data[i].isImportant) {
        importantCount += 1;
        importantTasks_section.innerHTML += taskTemplates.showImportant(
          tasks.data,
          i
        );
        allTasks_section.innerHTML += taskTemplates.showImportant(
          tasks.data,
          i
        );
      } else {
        activeCount += 1;
        regularTasks_section.innerHTML += taskTemplates.showActive(
          tasks.data,
          i
        );
        allTasks_section.innerHTML += taskTemplates.showActive(tasks.data, i);
      }
    } else {
      completeCount += 1;
      completeTasks_section.innerHTML += taskTemplates.showComplete(
        tasks.data,
        i
      );
    }
  }
  if (!completeCount) {
    completeTasks_section.innerHTML = taskTemplates.emptyComplete();
  }
  if (!importantCount) {
    importantTasks_section.innerHTML = taskTemplates.emptyImportant();
  }
  if (!activeCount) {
    regularTasks_section.innerHTML = taskTemplates.emptyActive();
  }

  if (!allCount) {
    allTasks_section.innerHTML = taskTemplates.emptyAll();
  }
  helper.showSelectedCard();
}

window.init = init;
