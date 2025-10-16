const BASE_URL = "http://localhost:8000/";

import customFetch from "./interceper.js";
window.fetch = customFetch;

// get full request
export async function fetchTodos() {
  const res = await fetch(BASE_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
}

// get selected request
export async function fetchTodoById(id) {
  try {
    const res = await fetch(`${BASE_URL}${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

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
export async function searchData(q) {
  try {
    const res = await fetch(`${BASE_URL}search/${q}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
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
export async function addTodo(text) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(text),
  });

  return res;
}

// update request
export async function updateTodo(id, text) {
  const res = await fetch(`${BASE_URL}${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(text),
  });

  return res;
}

// delete request
export async function deleteTodo(id) {
  const data = await fetch(`${BASE_URL}${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data;
}
