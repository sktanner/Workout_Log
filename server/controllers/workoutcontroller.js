const express = require("express")
const router = express.Router()
let validateJWT = require("../middleware/validate-jwt")
const { WorkoutModel } = require("../models")

router.get('/practice', validateJWT, (req, res) => {
    res.send('Hey!! This is a practice route!')
})

/* Workout Log Create */

router.post("/", validateJWT, async (req, res) => {
    const { description, definition, result } = req.body.log
    const { id } = req.user
    const WorkoutEntry = {
        description,
        definition,
        result,
        owner_id: id
    }
    try {
        const newWorkout = await WorkoutModel.create(WorkoutEntry)
        res.status(200).json(newWorkout)
    } catch (err) {
        res.status(500).json({ error: err })
    }
    // WorkoutModel.create(WorkoutEntry)
})

/* Get Workouts by User */

router.get("/", validateJWT, async (req, res) => {
    const { id } = req.user
    try {
        const userWorkouts = await WorkoutModel.findAll({
            where: {
                owner_id: id
            }
        })
        res.status(200).json(userWorkouts)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

/* Get Workouts by Id */

router.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const results = await WorkoutModel.findAll({
            where: { id: id }
        })
        res.status(200).json(results)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

/* Update a Workout */

router.put("/:id", validateJWT, async (req, res) => {
    const { description, definition, result } = req.body.log
    const workoutId = req.params.id
    const userId = req.user.id

    const query = {
        where: {
            id: workoutId,
            owner_id: userId
        }
    }

    const updatedWorkout = {
        description: description,
        definition: definition,
        result: result
    }

    try {
        const update = await WorkoutModel.update(updatedWorkout, query)
        res.status(200).json(updatedWorkout)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

/* Delete a Workout */

router.delete("/:id", validateJWT, async (req, res) => {
    const ownerId = req.user.id
    const workoutId = req.params.id

    try {
        const query = {
            where: {
                id: workoutId,
                owner_id: ownerId
            }
        }

        await WorkoutModel.destroy(query)
        res.status(200).json({ message: "Workout Log Removed" })
    } catch (err) {
        res.status(500).json({ error: err })
    }
})


module.exports = router