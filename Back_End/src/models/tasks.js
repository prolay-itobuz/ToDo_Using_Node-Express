import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    isImportant: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

taskSchema.query.byTitle = function (name) {
  return this.where({ name: new RegExp(name, 'i') });
};

const Task = mongoose.model('Task', taskSchema);
export default Task;
