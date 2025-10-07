import express from 'express';
import {
  getAllTodos,
  getTodoById,
  searchTodo,
  createTodo,
  updateTodo,
  deleteTodo
} from '../controller/controler.js';


const router = express.Router()


router.get('/', getAllTodos);

router.get('/:id', getTodoById);

router.get('/search/:str', searchTodo);

router.post('/', createTodo);

router.put('/:id', updateTodo);

router.delete('/:id', deleteTodo);

export default router;