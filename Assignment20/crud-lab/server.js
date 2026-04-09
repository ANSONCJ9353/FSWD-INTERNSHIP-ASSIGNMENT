const express = require("express");
const mongoose = require("mongoose");
const Task = require("./models/Task");

const app = express();
const PORT = 3000;

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/tasksDB");

app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.get("/tasks/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  task ? res.json(task) : res.status(404).json({ message: "Task not found" });
});

app.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  const savedTask = await task.save();
  res.json(savedTask);
});

app.put("/tasks/:id", async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  updatedTask ? res.json(updatedTask) : res.status(404).json({ message: "Task not found" });
});

app.delete("/tasks/:id", async (req, res) => {
  const deletedTask = await Task.findByIdAndDelete(req.params.id);
  deletedTask ? res.json({ message: "Task deleted" }) : res.status(404).json({ message: "Task not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});