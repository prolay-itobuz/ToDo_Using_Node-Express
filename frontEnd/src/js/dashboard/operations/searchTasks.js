import Helper from "../utils/helper.js";
import * as api from "../../api/api.js";
import Templates from "../utils/templates.js";
import init from "./displayTasks.js";

const helper = new Helper();
const taskTemplates = new Templates();
const searchInput = document.getElementById("searchInput");
const toastSection = document.getElementById("toastSection");
const searchTasks = document.getElementById("searchTasks");
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");
const searchForm = document.getElementById("searchForm");

searchForm.addEventListener("submit", handleSubmit);

// reset search filters
const resetSearch = () => {
  searchBtn.classList.remove("d-none");
  resetBtn.classList.add("d-none");
  searchForm.reset();

  init();
};

window.resetSearch = resetSearch;

async function handleSubmit(event) {
  try {
    event.preventDefault();

    if (searchInput.value.length < 3) {
      toastSection.innerHTML = taskTemplates.errorToast(
        "Please Enter min 3 character to Search"
      );

      setTimeout(() => {
        toastSection.innerHTML = "";
      }, 4000);
    } else {
      helper.hideAllCards();

      searchTasks.classList.remove("d-none");
      searchTasks.innerHTML = "";

      const data = await api.searchData(searchInput.value);

      if (!data) {
        searchTasks.innerHTML = taskTemplates.emptySearch();
      }

      for (let i = 0; i < data.data.length; i++) {
        if (data.data[i].isImportant) {
          searchTasks.innerHTML += taskTemplates.showImportant(data.data, i);
        } else {
          searchTasks.innerHTML += taskTemplates.showActive(data.data, i);
        }
      }
    }
  } catch (error) {
    toastSection.innerHTML = taskTemplates.errorToast(error.message);
  } finally {
    searchBtn.classList.add("d-none");
    resetBtn.classList.remove("d-none");
  }
}
