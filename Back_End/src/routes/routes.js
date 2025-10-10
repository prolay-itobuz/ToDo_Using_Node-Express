import express from 'express';
import controllerClass from '../controller/controler.js';

import ToDoValidations from '../validations/middlewares/todoValidations.js';

const router = express.Router();
const validationMiddleware = new ToDoValidations();
const controller = new controllerClass();

router.get('/', controller.getAllTodos);

router.get('/:id', controller.getTodoById);

router.get('/search/:str', controller.searchTodo);

router.post('/', validationMiddleware.validateRequest, controller.postDocument);

router.put('/:id', validationMiddleware.updateRequest, controller.updateTodo);

router.delete('/:id', controller.deleteTodo);

export default router;
