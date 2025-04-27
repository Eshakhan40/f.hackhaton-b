const Task = require('../models/Task');

// Create Task
exports.createTask = async (req, res) => {
  const { title, description, assignedTo, status } = req.body;

  try {
    const task = new Task({ title, description, assignedTo, status });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error creating task' });
  }
};

// Get All Tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};

// Update Task Status
exports.updateTaskStatus = async (req, res) => {
  const { taskId, status } = req.body;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.status = status;
    await task.save();
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error updating task status' });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    await Task.findByIdAndDelete(taskId);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task' });
  }
};
