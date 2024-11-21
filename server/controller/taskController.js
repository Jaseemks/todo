const { Task } = require("../model/taskModel");

const newTask = async (req, res, next) => {
    
    try {
        const { name } = req.body;
        console.log(req.body);
        
        if (!name) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        const newTask = new Task({ name });
        await newTask.save();

        res.status(201).json({ 
            success: true, 
            message: "Task created successfully", 
            data: newTask 
        });

    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message || "An error occurred"
        });
    }
}

const deleteTask = async (req, res, next) => {
    console.log("hit");
    try{
    const { id } = req.params;

    const taskDeleted = await Task.findByIdAndDelete({_id:id});
    // const taskDeleted = await Car.findByIdAndUpdate(id, { isDeleted: true }, { new: true });

    if (!taskDeleted) {
        return res.status(200).json({ success: true, message: "task not exist" })
    }
    else {
        console.log("Task deleted");
        res.status(200).json({ success: true, message: "Task deleted" })
    }
} catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message || "An error occurred"
        });
    }
}


const doneTask = async (req, res, next) => {
    console.log("hit");
    try{
    const { id } = req.params;

    const taskDone = await Task.findByIdAndUpdate(id, { isDone: true }, { new: true });

    if (!taskDone) {
        return res.status(200).json({ success: true, message: "task not exist" })
    }
    else {
        console.log("Task marked done");
        res.status(200).json({ success: true, message: "Task marked done" })
    }
} catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message || "An error occurred"
        });
    }
}

const editTask = async (req, res, next) => {
    console.log("hit");
    try {
        const { id } = req.params;
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ success: false, message: "Task name is required" });
        }

        const taskUpdated = await Task.findByIdAndUpdate(id, { name: name }, { new: true });
        if (!taskUpdated) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        console.log("Task updated successfully", taskUpdated);
        res.status(200).json({ success: true, message: "Task updated successfully", data: taskUpdated });

    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message || "An error occurred"
        });
    }
};


const getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find();
        console.log("hittttttttttttttttttttt");
        

        res.status(200).json({ success: true, message: "Tasks fetched", data: tasks });
        console.log(tasks);

    } catch (error) {
        next(error);
    }
};
module.exports = { newTask,deleteTask,doneTask,getTasks,editTask };
