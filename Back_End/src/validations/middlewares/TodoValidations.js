import { postSchema, updateSchema } from '../schema/toDoValidationsSchemas.js'

export default class ToDoValidations {
  validateRequest = async (req, res, next) => {
    try {
      await postSchema.validate(req.body, {
        abortEarly: false, // return all validation errors
        stripUnknown: true, // remove unexpected fields
      })

      next()
    } catch (err) {
      if (err.name === 'ValidationError') {
        err.status = 400
        next(new Error(err.errors.join(', ')))
      }
      next(err)
    }
  }

  updateRequest = async (req, res, next) => {
    try {
      await updateSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      })

      next()
    } catch (err) {
      if (err.name === 'ValidationError') {
        err.status = 400
        next(new Error(err.errors.join(', ')))
      }
      next(err)
    }
  }
}
