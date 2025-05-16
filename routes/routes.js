const express = require('express');
const router = express.Router();
const store = require('../data/store');

// --- GOALS ---
router.get('/getGoals', (req, res) => {
  res.json(store.goals);
});

router.post('/addGoal', (req, res) => {
  const { title, description, deadline } = req.body;
  const newGoal = {
    id: Date.now().toString(),
    title,
    description,
    deadline,
    tasks: []
  };
  store.goals.push(newGoal);
  res.status(201).json(newGoal);
});

router.delete('/removeGoal', (req, res) => {
  const { id } = req.body;
  store.goals = store.goals.filter(goal => goal.id !== id);
  res.json({ message: 'Goal removed' });
});

// --- TASKS ---
router.get('/getTasks', (req, res) => {
  res.json(store.tasks);
});

router.post('/addTask', (req, res) => {
  const { goalId, title } = req.body;
  const task = { id: Date.now().toString(), title, completed: false };

  const goal = store.goals.find(g => g.id === goalId);
  if (!goal) return res.status(404).json({ error: 'Goal not found' });

  goal.tasks.push(task);
  store.tasks.push(task);
  res.status(201).json(task);
});

router.delete('/removeTask', (req, res) => {
  const { goalId, taskId } = req.body;

  const goal = store.goals.find(g => g.id === goalId);
  if (!goal) return res.status(404).json({ error: 'Goal not found' });

  goal.tasks = goal.tasks.filter(task => task.id !== taskId);
  store.tasks = store.tasks.filter(task => task.id !== taskId);
  res.json({ message: 'Task removed' });
});

module.exports = router;
