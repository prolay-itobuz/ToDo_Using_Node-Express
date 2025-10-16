import manageDisplay from "../utils/helper.js";
import * as API from "../../Api/api.js";
import displayTemplates from "../utils/templates.js";
import init from "./displayTasks.js";

const helper = new manageDisplay();
const taskTemplates = new displayTemplates();
const searchForm = document.getElementById("searchForm"); //search Functionality
const searchBox = document.getElementById("searchInput");
const searchTasks_section = document.getElementById("searchTasks");
const toastSection = document.getElementById("toastsection");

searchForm.addEventListener("submit", handleSubmit);

// reset search filters
const resetSearch = () => {
  document.getElementById("searchBtn").classList.remove("d-none");
  document.getElementById("resetBtn").classList.add("d-none");
  document.getElementById("searchForm").reset();

  init();
};

window.resetSearch = resetSearch;

async function handleSubmit(event) {
  try {
    event.preventDefault();

    if (!searchBox.value) {
      toastSection.innerHTML = taskTemplates.errorToast(
        "Please Enter Details to Search."
      );

      setTimeout(() => {
        toastSection.innerHTML = "";
      }, 4000);
    } else if (searchBox.value.length < 3) {
      toastSection.innerHTML = taskTemplates.errorToast(
        "Please Enter min 3 character to Search"
      );

      setTimeout(() => {
        toastSection.innerHTML = "";
      }, 4000);
    } else {
      helper.hideAllCards();

      searchTasks_section.classList.remove("d-none");
      searchTasks_section.innerHTML = "";

      const data = await API.searchData(searchBox.value);

      if (!data) {
        searchTasks_section.innerHTML = taskTemplates.emptySearch();
      }

      for (let i = 0; i < data.data.length; i++) {
        if (data.data[i].isImportant) {
          searchTasks_section.innerHTML += taskTemplates.showImportant(
            data.data,
            i
          );
        } else {
          searchTasks_section.innerHTML += taskTemplates.showActive(
            data.data,
            i
          );
        }
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    document.getElementById("searchBtn").classList.add("d-none");
    document.getElementById("resetBtn").classList.remove("d-none");
  }
}
