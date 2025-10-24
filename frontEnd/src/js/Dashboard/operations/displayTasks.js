// Display The task Cards
import * as api from "../../api/api.js";
import Templates from "../utils/templates.js";
import Helper from "../utils/helper.js";

const taskTemplates = new Templates();
const helper = new Helper();

export default async function init() {
  // tasks Buttons toggle
  const radioButtons = document.querySelectorAll('input[name="btnradio"]');
  const importantTasks = document.getElementById("importantTasks");
  const regularTasks = document.getElementById("regularTasks");
  const completeTasks = document.getElementById("completeTasks");
  const allTasks = document.getElementById("allTasks");
  const toastSection = document.getElementById("toastSection");
  const allTaskLabel = document.getElementById("allTaskLabel");
  const impTaskLabel = document.getElementById("impTaskLabel");
  const activeTaskLabel = document.getElementById("activeTaskLabel");
  const completeTaskLabel = document.getElementById("completeTaskLabel");

  helper.showSelectedCard();

  radioButtons.forEach((radio) => {
    radio.addEventListener("change", helper.showSelectedCard);
  });

  try {
    let tasks = await api.fetchTodos();

    importantTasks.innerHTML = "";
    regularTasks.innerHTML = "";
    completeTasks.innerHTML = "";
    allTasks.innerHTML = "";

    let completeCount = 0,
      activeCount = 0,
      allCount = 0,
      importantCount = 0;

    for (let i = 0; i < tasks.data.length; i++) {
      if (!tasks.data[i].isCompleted) {
        allCount++;

        if (tasks.data[i].isImportant) {
          importantCount++;

          importantTasks.innerHTML += taskTemplates.showImportant(
            tasks.data,
            i
          );
          allTasks.innerHTML += taskTemplates.showImportant(tasks.data, i);
        } else {
          activeCount++;

          regularTasks.innerHTML += taskTemplates.showActive(tasks.data, i);
          allTasks.innerHTML += taskTemplates.showActive(tasks.data, i);
        }
      } else {
        completeCount++;

        completeTasks.innerHTML += taskTemplates.showComplete(tasks.data, i);
      }
    }

    if (!completeCount) {
      completeTasks.innerHTML = taskTemplates.emptyComplete();
    }

    if (!importantCount) {
      importantTasks.innerHTML = taskTemplates.emptyImportant();
    }

    if (!activeCount) {
      regularTasks.innerHTML = taskTemplates.emptyActive();
    }

    if (!allCount) {
      allTasks.innerHTML = taskTemplates.emptyAll();
    }

    helper.showSelectedCard();

    allTaskLabel.innerHTML = `All (${allCount})`;
    impTaskLabel.innerHTML = `Important (${importantCount})`;
    activeTaskLabel.innerHTML = `Active (${activeCount})`;
    completeTaskLabel.innerHTML = `Complete (${completeCount})`;
  } catch (err) {
    toastSection.innerHTML = taskTemplates.errorToast(err.message);
  }
}

window.init = init;
