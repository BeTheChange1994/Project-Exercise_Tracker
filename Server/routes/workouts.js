const express = require('express')
const { createWorkout, getWorkOuts, getWorkout, deleteWorkout, updateWorkout } = require('../controlers/workoutController')

const router = express.Router()

//GET all workouts
router.get('/', getWorkOuts)

//GET a single workout object
router.get('/:id', getWorkout)

//POST a new workout
router.post('/', createWorkout)

//DELETE a workout
router.delete('/:id', deleteWorkout)

//UPDATE a workout
router.patch('/:id', updateWorkout)

module.exports = router