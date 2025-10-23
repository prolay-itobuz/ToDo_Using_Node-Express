import Task from '../models/taskModel.js';
import getUserId from '../utils/validateToken.js';

export default class controllerClass {
  getAllTodos = async (req, res, next) => {
    try {
      const userId = getUserId(req);

      const allData = await Task.find({ userid: userId }).sort({
        createdAt: -1,
        updatedAt: -1,
      });

      res.status(200).send({
        message: 'All Task Successfully Fetched',
        success: true,
        data: allData,
      });
    } catch (err) {
      if (err.message == 'jwt expired') {
        res.status(401);
        next(err);
      }

      next(err);
    }
  };

  getTodoById = async (req, res, next) => {
    try {
      const userId = getUserId(req);

      const id = req.params.id;
      const todo = await Task.find({ _id: id, userid: userId });

      if (!todo) {
        res.status(404);
        throw new Error(`Todo not found`);
      }

      res.status(200).send({
        message: 'Task Successfully Fetched',
        success: true,
        data: todo,
      });
    } catch (err) {
      next(err);
    }
  };

  searchTodo = async (req, res, next) => {
    try {
      const userId = getUserId(req);
      const query = req.params.str.toLowerCase();

      if (!query) {
        res.status(404);
        throw new Error(`No query found`);
      }

      const todo = await Task.find({
        userid: userId,
        isCompleted: false,
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { tags: { $elemMatch: { $regex: query, $options: 'i' } } },
        ],
      }).sort({
        createdAt: -1,
        updatedAt: -1,
      });

      if (todo.length === 0) {
        res.status(404);
        throw new Error(`No Result found`);
      }

      res
        .status(200)
        .json({ message: 'Search result found.', success: true, data: todo });
    } catch (err) {
      next(err);
    }
  };

  postDocument = async (req, res, next) => {
    try {
      const userId = getUserId(req);
      req.body.userid = userId;

      const newTodo = new Task(req.body);

      await newTodo.save();

      res.status(201).json({
        message: 'Task Added Successfully',
        success: true,
        data: newTodo,
      });
    } catch (err) {
      next(err);
    }
  };

  updateTodo = async (req, res, next) => {
    try {
      const id = req.params.id;

      const updatedTodo = await Task.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!updatedTodo) {
        res.status(404);
        throw new Error(`Todo with id ${id} not found`);
      }

      res.status(200).json({
        message: 'Todo updated successfully',
        success: true,
        data: updatedTodo,
      });
    } catch (err) {
      next(err);
    }
  };

  deleteTodo = async (req, res, next) => {
    try {
      const id = req.params.id;
      const deletedTodo = await Task.findByIdAndDelete(id);

      if (!deletedTodo) {
        res.status(404);
        throw new Error(`Todo with id ${id} not found`);
      }

      res.status(200).send({
        message: 'Todo deleted successfully',
        success: true,
        id: deletedTodo._id,
      });
    } catch (err) {
      next(err);
    }
  };
}
