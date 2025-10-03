import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';

const router = express.Router()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbFile = path.join(__dirname, '../../database/todos.json')


router.get('/', (req, res) => {
  res.sendFile(dbFile)
})


router.get('/:id', async (req, res) => {
  try {
    const data = await fs.readFile(dbFile, 'utf-8');
    const todos = JSON.parse(data);

    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id); // it will give only the selected id

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(todo);
  } catch (err) {
    console.error("Error fetching todo:", err);
    res.status(500).json({ error: 'Failed to fetch todo' });
  }
});


router.post('/', async (req, res) => {
  try {
    const data = await fs.readFile(dbFile, 'utf-8');
    const todos = JSON.parse(data);

    const newTodo = {
      id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
      title: req.body.title,
      creation_time: Date.now(),
      is_completed: false,
      tags: req.body.tags || "",
      is_important: req.body.is_important || false,
      updated_at: Date.now()
    };

    todos.push(newTodo);

    await fs.writeFile(dbFile, JSON.stringify(todos, null, 2));

    console.log("New Todo Added:", newTodo);
    res.status(201).json({ message: 'Todo added successfully', todo: newTodo });

  } catch (err) {
    console.error("Error writing todo:", err);
    res.status(500).json({ error: 'Failed to add todo' });
  }
});




router.put('/:id', async (req, res) => {
  try {
    const data = await fs.readFile(dbFile, 'utf-8');
    const todos = JSON.parse(data);

    const id = parseInt(req.params.id);

    const index = todos.findIndex(todo => todo.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    todos[index] = {
      ...todos[index],
      ...req.body,
      updated_at: Date.now()
    };

    await fs.writeFile(dbFile, JSON.stringify(todos, null, 2));

    console.log(`Todo ${id} updated:`, todos[index]);
    res.json({ message: 'Todo updated successfully', todo: todos[index] });

  } catch (err) {
    console.error("Error updating todo:", err);
    res.status(500).json({ error: 'Failed to update todo' });
  }
});



router.delete('/:id', async (req, res) => {
  try {
    const data = await fs.readFile(dbFile, 'utf-8');
    const todos = JSON.parse(data);
    const id = parseInt(req.params.id);

    const newTodos = todos.filter(todo => todo.id !== id); // it will send the json if true means send all except the orginal id
    if (newTodos.length === todos.length) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    await fs.writeFile(dbFile, JSON.stringify(newTodos, null, 2));

    console.log(`Todo ${id} deleted`);
    res.json({ message: 'Todo deleted successfully', id });
  } 
  catch (err) {
    console.error("Error deleting todo:", err);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});


export default router;