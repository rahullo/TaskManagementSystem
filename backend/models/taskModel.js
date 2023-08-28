const { Double } = require('mongodb')

const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    Category: {
        type: String,
        required: [true, 'A category should have name']
    },
    TaskName: {
        type: String,
        required: [true, 'Task name should be defined']
    },
    TaskDescription: {
        type: String,
        required: [true, 'Task Description should be defined']
    }
})

const Tasks = mongoose.model('Tasks', taskSchema)

module.exports = Tasks