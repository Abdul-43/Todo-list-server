import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from "dotenv"
import Todo from './models/Todo.js';

dotenv.config();

const app = express();
const PORT=8000;

app.use(express.json());
app.use(cors());

await mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("Connected to db"))
  .catch((error) => console.error("Connection to db failed:", error));

app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error("Error retrieving todos:", error);
    res.status(500).json({ error: "Failed to retrieve todos" });
  }
});

app.post('/todo/new', async (req, res) => {
  try {
    const todo = new Todo({
      text: req.body.text
    });

    await todo.save();

    res.json(todo);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ error: "Failed to create todo" });
  }
});

app.delete('/todo/delete/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    res.json(todo);
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

app.get('/todo/complete/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }


    todo.complete = !todo.complete;


    await todo.save();
    res.json(todo);
  } catch (error) {
    console.error('Error completing todo:', error);
    res.status(500).json({ error: 'Failed to complete todo' });
  }
});

app.listen(PORT, () => console.log("Server started on port",PORT));
