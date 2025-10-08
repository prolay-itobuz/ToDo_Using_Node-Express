import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  is_completed: {
    type: Boolean,
    default: false
  },
  is_important:{
    type: Boolean,
    default: false
  },
  tags:{
    type: [String],
    default:[]
  },
  creation_time: {
    type: Date,
    default: Date.now()
  },
  updated_at:{
    type: Date,
    default: Date.now()
  }
});

const Task = mongoose.model('Task', taskSchema);

export default Task;