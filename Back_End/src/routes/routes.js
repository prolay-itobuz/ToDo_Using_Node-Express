import express from 'express'
import {
  getAllTodos,
  getTodoById,
  // searchTodo,
  postDocument,
  updateTodo,
  deleteTodo,
} from '../controller/controler.js'

import ToDoValidations from '../validations/middlewares/todoValidations.js'

const router = express.Router()
const validationMiddleware = new ToDoValidations()

router.get('/', getAllTodos)

router.get('/:id', getTodoById)

// router.get('/search/:str', searchTodo);

router.post('/', validationMiddleware.validateRequest, postDocument)

router.put('/:id', validationMiddleware.updateRequest, updateTodo)

router.delete('/:id', deleteTodo)

export default router
