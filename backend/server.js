const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config({path: './config.env'})
const app = require('./app')


const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {
    useNewUrlParser: true
}).then(() => {
    console.log('DB connection succesfull!!')
})

port = 3000

const server = app.listen(port, ()=> {
    console.log("Server is LIVE...")
})

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION: 🙋🙋 SHUTTING DOWN');
    console.log('💥🙋', err.name, err.message);
    server.close(() => {
        process.exit(1);

    })
})