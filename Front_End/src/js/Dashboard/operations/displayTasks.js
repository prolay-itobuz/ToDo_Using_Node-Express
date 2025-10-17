// Display The task Cards
import * as API from "../../Api/api.js";
import Templates from "../utils/templates.js";
import Helper from "../utils/helper.js";

const taskTemplates = new Templates();
const helper = new Helper();

export default async function init() {
  // tasks Buttons toggle
  const radioButtons = document.querySelectorAll('input[name="btnradio"]');

  helper.showSelectedCard();

  radioButtons.forEach((radio) => {
    radio.addEventListener("change", helper.showSelectedCard);
  });

  try {
    let tasks = await API.fetchTodos();

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
        allCount += 1;

        if (tasks.data[i].isImportant) {
          importantCount += 1;

          importantTasks.innerHTML += taskTemplates.showImportant(
            tasks.data,
            i
          );
          allTasks.innerHTML += taskTemplates.showImportant(tasks.data, i);
        } else {
          activeCount += 1;

          regularTasks.innerHTML += taskTemplates.showActive(tasks.data, i);
          allTasks.innerHTML += taskTemplates.showActive(tasks.data, i);
        }
      } else {
        completeCount += 1;

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
  } catch (err) {
    toastSection.innerHTML = taskTemplates.errorToast(err.message);
  }
}

window.init = init;
