import mongoose from 'mongoose';

const { Schema } = mongoose;

const TodoSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  complete: {
    type: Boolean,
    default: false
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Todo = mongoose.model('Todo', TodoSchema);

export default Todo;
