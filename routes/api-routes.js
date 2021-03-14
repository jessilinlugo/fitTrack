const router = require("express").Router();
const db = require("../models/index");

router.post("/api/workouts", (req, res) => {
    db.Workout.create({}).then(wOut => {
        res.json(wOut)
    }).catch(error => res.json(error));
});

router.put("/api/workouts/:id", (req, res) => {
    const currentWorkout = req.params.id;
    db.Workout.findByIdAndUpdate(currentWorkout, { $push: { exercises: req.body } })
    .then(wOut => {
        res.json(wOut)
    }).catch(error => res.json(error));
})