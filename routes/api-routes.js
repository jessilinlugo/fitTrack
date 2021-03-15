const router = require("express").Router();
const db = require("../models/index");


router.post("/api/workouts", (req, res) => {
    db.Workout.create({}).then(workO => {
        res.json(workO)
    }).catch(error => res.json(error));
});

router.put("/api/workouts/:id", (req, res) => {
    const currentWorkout = req.params.id;
    db.Workout.findByIdAndUpdate(currentWorkout, { $push: { exercises: req.body } })
        .then(workO => {
            res.json(workO)
        }).catch(error => res.json(error));
});

router.get("/api/workouts/", (req, res) => {
    db.Workout.find({}).then(workO => {
        res.json(workO)
    }).catch(error => res.json(error));
});

