const express = require('express')

const tasksController = require('../controllers/taskControllers')

const router = express.Router();


router.route('/').get(tasksController.allTasks).post(tasksController.createTasks)

module.exports = router