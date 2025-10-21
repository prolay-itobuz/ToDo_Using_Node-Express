import customFetch from "./interceptor.js";
import Helper from "../dashboard/utils/helper.js";

const BASE_URL = "http://localhost:8000";
const details = new Helper();
window.fetch = customFetch;

// get full request
export async function fetchTodos() {
  const res = await fetch(BASE_URL, details.option("GET"));

  return res;
}

// get selected request
export async function fetchTodoById(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, details.option("GET"));

    if (!res.success) {
      throw new Error(`Todo with id ${id} not found`);
    }

    return res;
  } catch (err) {
    console.error("Error fetching todo:", err);
    return null;
  }
}

//search request
export async function searchData(query) {
  try {
    const res = await fetch(
      `${BASE_URL}/search/${query}`,
      details.option("GET")
    );

    if (!res.success) {
      throw new Error(`Todo not found`);
    }

    return res;
  } catch (err) {
    console.error("Error fetching todo:", err);
    return null;
  }
}

// post request
export async function addTodo(todo) {
  const res = await fetch(BASE_URL, details.option("POST", todo));

  return res;
}

// update request
export async function updateTodo(id, todo) {
  const res = await fetch(`${BASE_URL}/${id}`, details.option("PUT", todo));

  return res;
}

// delete request
export async function deleteTodo(id) {
  const data = await fetch(`${BASE_URL}/${id}`, details.option("DELETE"));

  return data;
}
