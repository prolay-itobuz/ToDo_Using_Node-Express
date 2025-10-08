// import path from 'path'
// import { fileURLToPath } from 'url'
// import { promises as fs } from 'fs'
import { todoSchema } from '../validations/validator.js';
import Task from '../models/tasks.js';


// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)
// const dbFile = path.join(__dirname, '../../database/todos.json')

// export const getAllTodos = (req, res) => {
//   res.sendFile(dbFile)
// }

// export const getTodoById = async (req, res, next) => {
//   try {
//     const data = await fs.readFile(dbFile, 'utf-8')
//     const todos = JSON.parse(data)

//     const id = req.params.id
//     const todo = todos.find((t) => t.id === id)

//     if (!todo) {
//       const error = new Error(`Todo with id ${id} not found`)
//       error.statusCode = 404
//       throw error
//     }

//     res.json(todo)
//   } catch (err) {
//     next(err)
//   }
// }

// export const searchTodo = async (req, res, next) => {
//   try {
//     const data = await fs.readFile(dbFile, 'utf-8');
//     const todos = JSON.parse(data);

//     const query = req.params.str.toLowerCase();
    
//     const todo = todos.filter((t) => {
//       if (t.is_completed) {
//         return false;
//       }

//       const titleMatch = t.title.toLowerCase().includes(query);
//       const tagsMatch = t.tags.some(tag => tag.toLowerCase().includes(query));

//       return titleMatch || tagsMatch;
//     });

//     if (todo.length === 0) {
//       const error = new Error(`No search result found.`);
//       error.statusCode = 404;
//       throw error;
//     }
    
//     res.json(todo);

//   } catch (err) {
//     next(err);
//   }
// };

export const postDocument = async (req, res, next) => {
  try {

    const validatedData = await todoSchema.validate(req.body, { abortEarly: false, stripUnknown: true });
    const newTodo = new Task(validatedData);
    await newTodo.save();

    console.log('New Todo Added:', newTodo)
    res.status(201).json({ message: 'Todo added successfully', todo: newTodo })

  } catch (err) {
    next(err)
  }
}

// export const updateTodo = async (req, res, next) => {
//   try {
//     const data = await fs.readFile(dbFile, 'utf-8')
//     const todos = JSON.parse(data)
//     const id = req.params.id
//     const index = todos.findIndex((todo) => todo.id === id)

//     if (index === -1) {
//       const error = new Error(`Todo with id ${id} not found.`)
//       error.statusCode = 404
//       throw error
//     }

//     todos[index] = {
//       ...todos[index],
//       ...req.body,
//       updated_at: Date.now(),
//     }

//     await fs.writeFile(dbFile, JSON.stringify(todos, null, 2))

//     console.log(`Todo ${id} updated:`, todos[index])
//     res.json({ message: 'Todo updated successfully', todo: todos[index] })
//   } catch (err) {
//     next(err)
//   }
// }

// export const deleteTodo = async (req, res, next) => {
//   try {
//     const data = await fs.readFile(dbFile, 'utf-8')
//     const todos = JSON.parse(data)
//     const id = req.params.id
//     const todoIndex = todos.findIndex((todo) => todo.id === id)

//     if (todoIndex === -1) {
//       const error = new Error(`Todo with id ${id} not found.`)
//       error.statusCode = 404
//       throw error
//     }

//     todos.splice(todoIndex, 1)
//     await fs.writeFile(dbFile, JSON.stringify(todos, null, 2))

//     console.log(`Todo ${id} deleted`)
//     res.json({ message: 'Todo deleted successfully', id })
//   } catch (err) {
//     next(err)
//   }
// }
