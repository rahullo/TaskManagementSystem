const express = require('express')

const AppError = require('./utils/appError')
const TaskRoutes = require('./routes/tasksRoutes')


const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Here All OK!!"
    })
})

app.get('/rahul', (req, res) => {
    res.status(200).json({
        message: "This is rahul route"
    })
})


app.use('/api/v1/tasks', TaskRoutes)

app.get("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server `, 404))
})


module.exports = app