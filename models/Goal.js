const mongoose = require('mongoose');

// Subdocumento: Tarea individual
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
}, { _id: true });

// Documento principal: Meta personal
const goalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  deadline: {
    type: String,
    required: false
  },
  tasks: [taskSchema] // Tareas embebidas dentro del goal
});

module.exports = mongoose.model('Goal', goalSchema);
