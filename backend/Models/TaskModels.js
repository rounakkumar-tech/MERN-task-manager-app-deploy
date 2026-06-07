const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    isDone: {
        type: Boolean,
        default: false
    }
});


const TaskModel = mongoose.model('Todos', taskSchema);
module.exports = TaskModel;