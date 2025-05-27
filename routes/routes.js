const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');

const API_KEY = '12345';

// Middleware para validar API Key
router.use((req, res, next) => {
  const clientKey = req.headers['x-api-key'];
  if (clientKey !== API_KEY) {
    return res.status(401).json({ error: 'Unauthorized: Invalid API key' });
  }
  next();
});

// --- GOALS ---

// GET /getGoals
router.get('/getGoals', async (req, res) => {
  try {
    const goals = await Goal.find();
    res.status(200).json(goals);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener metas' });
  }
});

// POST /addGoal
router.post('/addGoal', async (req, res) => {
  const { title, description, deadline } = req.body;
  if (!title || !description || !deadline) {
    return res.status(400).json({ error: 'Missing parameters for goal creation' });
  }

  try {
    const newGoal = new Goal({ title, description, deadline, tasks: [] });
    await newGoal.save();
    res.status(201).json(newGoal);
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar la meta' });
  }
});

// DELETE /removeGoal
router.delete('/removeGoal', async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ error: 'Missing goal ID' });

  try {
    await Goal.findByIdAndDelete(id);
    res.status(200).json({ message: 'Goal removed' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar la meta' });
  }
});

// --- TASKS ---

// GET /getTasks (retorna todas las tareas de todas las metas)
router.get('/getTasks', async (req, res) => {
  try {
    const goals = await Goal.find();
    const allTasks = goals.flatMap(goal => 
      goal.tasks.map(task => ({
        ...task.toObject(),
        goalId: goal._id
      }))
    );
    res.status(200).json(allTasks);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener tareas' });
  }
});

// POST /addTask
router.post('/addTask', async (req, res) => {
  const { goalId, title } = req.body;
  if (!goalId || !title) {
    return res.status(400).json({ error: 'Missing parameters for task creation' });
  }

  try {
    const goal = await Goal.findById(goalId);
    if (!goal) return res.status(404).json({ error: 'Goal not found' });

    const newTask = { title, completed: false };
    goal.tasks.push(newTask);
    await goal.save();

    res.status(201).json(goal.tasks[goal.tasks.length - 1]); // la tarea recién agregada
  } catch (err) {
    res.status(500).json({ error: 'Error al agregar la tarea' });
  }
});

// DELETE /removeTask
router.delete('/removeTask', async (req, res) => {
  const { goalId, taskId } = req.body;
  if (!goalId || !taskId) {
    return res.status(400).json({ error: 'Missing parameters for task removal' });
  }

  try {
    const goal = await Goal.findById(goalId);
    if (!goal) return res.status(404).json({ error: 'Goal not found' });

    goal.tasks = goal.tasks.filter(task => task._id.toString() !== taskId);
    await goal.save();

    res.status(200).json({ message: 'Task removed' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar la tarea' });
  }
});

// PUT /updateTaskStatus
router.put('/updateTaskStatus', async (req, res) => {
  const { goalId, taskId, completed } = req.body;
  if (!goalId || !taskId || completed === undefined) {
    return res.status(400).json({ error: 'Missing data for update' });
  }

  try {
    const goal = await Goal.findById(goalId);
    if (!goal) return res.status(404).json({ error: 'Goal not found' });

    const task = goal.tasks.id(taskId);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    task.completed = completed;
    await goal.save();

    res.status(200).json({ message: 'Task updated' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
