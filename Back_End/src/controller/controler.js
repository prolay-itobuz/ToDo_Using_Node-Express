import Task from '../models/tasks.js';

export default class controllerClass {
  getAllTodos = async (req, res, next) => {
    try {
      const allData = await Task.find({});
      res.send(allData);
    } catch (err) {
      next(err);
    }
  };

  getTodoById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const todo = await Task.findById(id);

      if (!todo) {
        const error = new Error(`Todo with id ${id} not found`);
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json(todo);
    } catch (err) {
      next(err);
    }
  };

  // searchTodo = async (req, res, next) => {
  //   try {
  //     const data = await fs.readFile(dbFile, 'utf-8')
  //     const todos = JSON.parse(data)

  //     const query = req.params.str.toLowerCase()

  //     const todo = todos.filter((t) => {
  //       if (t.is_completed) {
  //         return false
  //       }

  //       const titleMatch = t.title.toLowerCase().includes(query)
  //       const tagsMatch = t.tags.some((tag) =>
  //         tag.toLowerCase().includes(query)
  //       )

  //       return titleMatch || tagsMatch
  //     })

  //     if (todo.length === 0) {
  //       const error = new Error(`No search result found.`)
  //       error.statusCode = 404
  //       throw error
  //     }

  //     res.json(todo)
  //   } catch (err) {
  //     next(err)
  //   }
  // }

  postDocument = async (req, res, next) => {
    try {
      const newTodo = new Task(req.body);
      await newTodo.save();

      console.log('New Todo Added:', newTodo);
      res
        .status(201)
        .json({ message: 'Todo added successfully', todo: newTodo });
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
        const error = new Error(`Todo with id ${id} not found.`);
        error.statusCode = 404;
        throw error;
      }

      console.log(`Todo ${id} updated:`, updatedTodo);
      res
        .status(200)
        .json({ message: 'Todo updated successfully', todo: updatedTodo });
    } catch (err) {
      next(err);
    }
  };

  deleteTodo = async (req, res, next) => {
    try {
      const id = req.params.id;
      const deletedTodo = await Task.findByIdAndDelete(id);

      if (!deletedTodo) {
        const error = new Error(`Todo with id ${id} not found.`);
        error.statusCode = 404;
        throw error;
      }
      console.log(`Todo ${id} deleted`);
      res
        .status(200)
        .json({ message: 'Todo deleted successfully', id: deletedTodo._id });
    } catch (err) {
      next(err);
    }
  };
}
