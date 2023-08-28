const Tasks = require('../models/taskModel')


exports.allTasks = async (req, res) => {

    const tasks = await Tasks.find();

    res.status(200).json({
        message: "SUCCESS",
        length: tasks.length,
        tasks: tasks
    })
}


exports.createTasks = async(req, res) => {

    const newTask = await Tasks.create(req.body);

    res.status(200).json({
        message: "SUCCESS",
        Task: newTask
    })
}