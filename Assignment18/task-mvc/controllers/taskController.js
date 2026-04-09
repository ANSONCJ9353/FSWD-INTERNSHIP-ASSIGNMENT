let tasks = require("../models/taskModel");

exports.getTasks = (req, res) => {
  res.json(tasks);
};

exports.getTaskById = (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  task
    ? res.json(task)
    : res.status(404).json({ message: "Task not found" });
};

exports.createTask = (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false
  };
  tasks.push(newTask);
  res.json(newTask);
};

exports.updateTask = (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);

  if (task) {
    task.title = req.body.title || task.title;
    task.completed =
      req.body.completed !== undefined ? req.body.completed : task.completed;

    res.json(task);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
};

exports.deleteTask = (req, res) => {
  tasks = tasks.filter(t => t.id != req.params.id);
  res.json({ message: "Task deleted" });
};