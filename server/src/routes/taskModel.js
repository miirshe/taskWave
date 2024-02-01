const express = require('express');
const { createTasks, getUserTasks, updateTasks, deleteTasks } = require('../controllers/taskController');
const { userAuthenticate } = require('../middleware/userAuthenticate');

const taskRoutes = express.Router();
taskRoutes.post('/task/create', userAuthenticate , createTasks);
taskRoutes.get('/tasks', userAuthenticate ,getUserTasks)
taskRoutes.put('/task/:id', userAuthenticate , updateTasks);
taskRoutes.delete('/task/:id', userAuthenticate , deleteTasks);
module.exports = taskRoutes;