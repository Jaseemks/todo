const express = require('express');
const { newTask, deleteTask, doneTask, getTasks,editTask } = require('../../controller/taskController');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.send("root route");
});

router.post("/newtask",newTask)

router.get("/tasklist",getTasks)

router.put("/markdone/:id",doneTask)

router.put("/edit/:id",editTask)

router.delete("/deletetask/:id",deleteTask)


module.exports = router;
