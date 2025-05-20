const express = require('express');
const router = express.Router();
const store = require('../data/store');

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
router.get('/getGoals', (req, res) => {
  res.status(200).json(store.goals);
});

router.post('/addGoal', (req, res) => {
  const { title, description, deadline } = req.body;
  if (!title || !description || !deadline) {
    return res.status(400).json({ error: 'Missing parameters for goal creation' });
  }

  const newGoal = {
    id: Date.now().toString(),
    title,
    description,
    deadline,
    tasks: []
  };
  store.goals.push(newGoal);
  res.status(201).json(newGoal); // 201 para creación exitosa
});

router.delete('/removeGoal', (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: 'Missing goal ID' });
  }

  store.goals = store.goals.filter(goal => goal.id !== id);
  res.status(200).json({ message: 'Goal removed' });
});

// --- TASKS ---
router.get('/getTasks', (req, res) => {
  res.status(200).json(store.tasks);
});

router.post('/addTask', (req, res) => {
  const { goalId, title } = req.body;
  if (!goalId || !title) {
    return res.status(400).json({ error: 'Missing parameters for task creation' });
  }

  const goal = store.goals.find(g => g.id === goalId);
  if (!goal) return res.status(404).json({ error: 'Goal not found' });

  const task = { id: Date.now().toString(), title, completed: false };
  goal.tasks.push(task);
  store.tasks.push(task);
  res.status(201).json(task);
});

router.delete('/removeTask', (req, res) => {
  const { goalId, taskId } = req.body;
  if (!goalId || !taskId) {
    return res.status(400).json({ error: 'Missing parameters for task removal' });
  }

  const goal = store.goals.find(g => g.id === goalId);
  if (!goal) return res.status(404).json({ error: 'Goal not found' });

  goal.tasks = goal.tasks.filter(task => task.id !== taskId);
  store.tasks = store.tasks.filter(task => task.id !== taskId);
  res.status(200).json({ message: 'Task removed' });
});

module.exports = router;
