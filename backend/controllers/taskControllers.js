const Tasks = require('../models/taskModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync')


exports.allTasks = catchAsync(async (req, res) => {

    // const tasks = await Tasks.find();


// Aggregate tasks and group them by category
    const tasks = await Tasks.aggregate([
        {
            $group: {
            _id: '$Category', // Group tasks by category field
            tasks: { $push: '$$ROOT' } // Store tasks in an array
            }
        }
        ])
        .then(result => {
            // 'result' is an array of objects, each representing a category and its tasks
            return result
        })
        .catch(error => {
            console.error('Error aggregating tasks:', error);
        });


    res.status(200).json({
        message: "SUCCESS",
        length: tasks.length,
        tasks: tasks
    })
})

exports.getTaskByID = catchAsync(async(req, res, next) => {
    const task = await Tasks.findById(req.params.id);

    if(!task) {
        return next(new AppError('No Task is found with that ID', 404));
    }

    res.status(200).json({
        message: "SUCCESS",
        task: task
    })
})


exports.createTasks = catchAsync(async(req, res) => {

    const newTask = await Tasks.create(req.body);

    res.status(200).json({
        message: "SUCCESS",
        Task: newTask
    })
})

exports.deleteTask = catchAsync(async(req, res, next) => {
    const task = await Tasks.findByIdAndDelete(req.params.id);

    if(!task) {
        return next(new AppError('No Task is found with that ID', 404));
    }

    res.status(200).json({
        status: "SUCCESS",
        task: task
    })
})

exports.updateTask = catchAsync(async(req, res, next) => {
    const task = await Tasks.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true
    })

    if(!task) {
        return next(new AppError('No Task is found with that ID', 404))
    }

    res.status(200).json({
        status: 'SUCCESS',
        task: task
    })
})