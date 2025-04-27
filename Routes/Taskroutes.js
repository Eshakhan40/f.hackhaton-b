// routes/taskRoutes.js
const express = require('express');
const Task = require('../Models/Task');  // corrected path
const router = express.Router();

// Create Task
router.post('/Task', async (req, res) => {
    try {
        const { title, description, assignedTo, status } = req.body;
        const task = new Task({ title, description, assignedTo, status });
        await task.save();  
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Tasks
router.get('/Tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Task Status
router.put('/Task/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const task = await Task.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete Task
router.delete('/Task/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
