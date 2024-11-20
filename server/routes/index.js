const express = require('express');
const taskRoute = require('./task/taskRoute');
const apiRouter = express.Router();

apiRouter.use('/task', taskRoute);

module.exports = { apiRouter };
