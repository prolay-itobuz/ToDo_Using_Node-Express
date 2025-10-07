import path from 'path'
import { fileURLToPath } from 'url'
import { promises as fs } from 'fs'
import { v4 as uuidv4 } from 'uuid'
import { todoSchema } from '../validations/validator.js';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dbFile = path.join(__dirname, '../../database/todos.json')

export const getAllTodos = (req, res) => {
  res.sendFile(dbFile)
}

export const getTodoById = async (req, res, next) => {
  try {
    const data = await fs.readFile(dbFile, 'utf-8')
    const todos = JSON.parse(data)

    const id = req.params.id
    const todo = todos.find((t) => t.id === id)

    if (!todo) {
      const error = new Error(`Todo with id ${id} not found`)
      error.statusCode = 404
      throw error
    }

    res.json(todo)
  } catch (err) {
    next(err)
  }
}

export const searchTodo = async (req, res, next) => {
  try {
    const data = await fs.readFile(dbFile, 'utf-8')
    const todos = JSON.parse(data)

    const query = req.params.str.toLowerCase()
    const todo = todos.filter(
      (t) =>
        !t.is_completed &&
        (t.title.toLowerCase().includes(query) ||
          t.tags.toLowerCase().includes(query))
    )

    if (!todo) {
      const error = new Error(`No search result found.`)
      error.statusCode = 404
      throw error
    }
    res.json(todo)

  } catch (err) {
    next(err)
  }
}

export const createTodo = async (req, res, next) => {
  try {
    const data = await fs.readFile(dbFile, 'utf-8')
    const todos = JSON.parse(data)

    const validatedBody = await todoSchema.validate(req.body, { abortEarly: false });

    if (!req.body.title) {
      const error = new Error(`Title not Found.`)
      error.statusCode = 404
      throw error
    }

    const newTodo = {
      // id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
      id: uuidv4(),
      title: validatedBody.title,
      creation_time: Date.now(),
      is_completed: false,
      tags: validatedBody.tags || '',
      is_important: validatedBody.is_important || false,
      updated_at: Date.now(),
    }

    todos.push(newTodo)
    await fs.writeFile(dbFile, JSON.stringify(todos, null, 2))

    console.log('New Todo Added:', newTodo)
    res.status(201).json({ message: 'Todo added successfully', todo: newTodo })
  } catch (err) {
    next(err)
  }
}

export const updateTodo = async (req, res, next) => {
  try {
    const data = await fs.readFile(dbFile, 'utf-8')
    const todos = JSON.parse(data)
    const id = req.params.id
    const index = todos.findIndex((todo) => todo.id === id)

    if (index === -1) {
      const error = new Error(`Todo with id ${id} not found.`)
      error.statusCode = 404
      throw error
    }

    todos[index] = {
      ...todos[index],
      ...req.body,
      updated_at: Date.now(),
    }

    await fs.writeFile(dbFile, JSON.stringify(todos, null, 2))

    console.log(`Todo ${id} updated:`, todos[index])
    res.json({ message: 'Todo updated successfully', todo: todos[index] })
  } catch (err) {
    next(err)
  }
}

export const deleteTodo = async (req, res, next) => {
  try {
    const data = await fs.readFile(dbFile, 'utf-8')
    const todos = JSON.parse(data)
    const id = req.params.id
    const todoIndex = todos.findIndex((todo) => todo.id === id)

    if (todoIndex === -1) {
      const error = new Error(`Todo with id ${id} not found.`)
      error.statusCode = 404
      throw error
    }

    todos.splice(todoIndex, 1)
    await fs.writeFile(dbFile, JSON.stringify(todos, null, 2))

    console.log(`Todo ${id} deleted`)
    res.json({ message: 'Todo deleted successfully', id })
  } catch (err) {
    next(err)
  }
}
