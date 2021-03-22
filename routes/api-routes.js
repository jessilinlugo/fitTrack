const router = require("express").Router();
const db = require("../models/index");

//this creates a new workout
router.post("/api/workouts", (req, res) => {
    db.Workout.create({}).then(workO => {
        res.json(workO)
    }).catch(error => res.json(error));
});

//find workout by ID
router.put("/api/workouts/:id", (req, res) => {
    const currentWorkout = req.params.id;
    db.Workout.findByIdAndUpdate(currentWorkout, { $push: { exercises: req.body } })
        .then(workO => {
            res.json(workO)
        }).catch(error => res.json(error));
});

//show all workouts
router.get("/api/workouts/", (req, res) => {
    // db.Workout.find({}).then(workO => {
    //     res.json(workO)
    // }).catch(error => res.json(error));
    db.Workout.aggregate([{ $addFields: { totalDuration: { $sum: '$exercises.duration' } } }])
        .then(workO => {
            res.json(workO)
        }).catch(error => res.json(error));

});

//show 7 prev workouts
router.get("/api/workouts/range", (req, res) => {
    db.Workout.aggregate([{ $addFields: { totalDuration: { $sum: '$exercises.duration' } } }])
        .sort({ _id: -1 })
        .limit(7)
        .then(data => {
            console.log(data);
            res.json(data);
        })
        .catch(error => res.send(error));
});


module.exports = router;