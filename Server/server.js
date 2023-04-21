require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

//Express app
const app = express()

// Middleware printing requests to server
app.use(express.json())//Checks requests for json payloads in body

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//Routes
app.use('/api/workouts', workoutRoutes)

//Connect to db
mongoose.connect(process.env.MONGO_URI)//returns a promise
    .then( () => {//Fires a function after promise is returned

        //Listen for requests; starts server
        app.listen(process.env.PORT, () => {
            console.log('Connected to db, listening on port', process.env.PORT)
        })

    })
    .catch((error) => {
        console.log(error)
    })


