const ownAPI = "http://localhost:8000/";

// get full request
export async function fetchTodos() {
  const res = await fetch(ownAPI);
  const data = await res.json();
  return data;
}

// get selected request
export async function fetchTodoById(id) {
  try {
    const res = await fetch(`${ownAPI}${id}`);
    if (!res.ok) {
      throw new Error(`Todo with id ${id} not found`);
    }
    const todo = await res.json();
    return todo;
  } catch (err) {
    console.error("Error fetching todo:", err);
    return null;
  }
}

//search request
export async function searchData(q) {
  try {
    const res = await fetch(`${ownAPI}search/${q}`);
    if (!res.ok) {
      throw new Error(`Todo not found`);
    }
    const todo = await res.json();
    return todo;
  } catch (err) {
    console.error("Error fetching todo:", err);
    return null;
  }
}

// post request
export async function addTodo(text) {
  const res = await fetch(ownAPI, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(text),
  });
  const newTodo = await res.json();
  
  return newTodo;
}

// update request
export async function updateTodo(id, text) {
  const res = await fetch(`${ownAPI}${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(text),
  });
  const updated = await res.json();
  return updated;
}

// delete request
export async function deleteTodo(id) {
  const data = await fetch(`${ownAPI}${id}`, { method: "DELETE" });
  return data;
}
