import express from 'express';
import {
  getAllTodos,
  getTodoById,
  // searchTodo,
  postDocument,
  // updateTodo,
  // deleteTodo
} from '../controller/controler.js';


const router = express.Router()


router.get('/', getAllTodos);

router.get('/:id', getTodoById);

// router.get('/search/:str', searchTodo);

router.post('/', postDocument);

// router.put('/:id', updateTodo);

// router.delete('/:id', deleteTodo);

export default router;