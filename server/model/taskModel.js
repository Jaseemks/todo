const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the task"]
    },
    // date: {
    //     type: Date,
    //     required: [true, "Please select the date"]
    // },
    // time: {
    //     type: String,
    //     required: [true, "Please select the time"]
    // },
    isDone: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
});


const Task = mongoose.model('Task', taskSchema); 

module.exports = { Task };