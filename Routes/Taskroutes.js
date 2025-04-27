// routes/taskRoutes.js
const express = require('express');
const Task = require('./Models/Task');
const router = express.Router();

// Create Task
router.post('/task', async (req, res) => {
    const { title, description, assignedTo, status } = req.body;

    
    const task = new Task({ title, description, assignedTo, status });
    await task.save();
    res.status(201).json(task);
});

// Get Tasks
router.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// Update Task Status
router.put('/task/:id', async (req, res) => {
    const { status } = req.body;
    const task = await Task.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(task);
});

// Delete Task
router.delete('/task/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

module.exports = router;
