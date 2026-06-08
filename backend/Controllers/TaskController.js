const TaskModel = require('../Models/TaskModels');

const createTask = async (req, res) => {
    const data = req.body;

    try {
        // Validation
        if (!data.taskName || typeof data.taskName !== 'string' || data.taskName.trim() === '') {
            return res.status(400).json({ message: "Task name is required and cannot be empty", success: false });
        }

        const model = new TaskModel(data);
        await model.save();
        res.status(201).json({ message: "Task created successfully", success: true, data: model });
    }
    catch (error) {
        console.error('Create task error:', error);
        res.status(500).json({ message: "Failed to create task", success: false });
    }   
};

const fetchAllTasks = async (req, res) => {
    try {
        const data = await TaskModel.find({});
        res.status(200).json({ message: "All Tasks", success: true, data });
    }
    catch (error) {
        console.error('Fetch tasks error:', error);
        res.status(500).json({ message: "Failed to fetch tasks", success: false });
    }   
};

const updateTaskById = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;

        // Validation
        if (!id) {
            return res.status(400).json({ message: "Task ID is required", success: false });
        }
        
        if (body.taskName && (typeof body.taskName !== 'string' || body.taskName.trim() === '')) {
            return res.status(400).json({ message: "Task name cannot be empty", success: false });
        }

        const obj = { $set: { ...body } };
        const updatedTask = await TaskModel.findByIdAndUpdate(id, obj, { new: true });
        
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found", success: false });
        }

        res.status(200).json({ message: "Task updated successfully", success: true, data: updatedTask });
    }
    catch (error) {
        console.error('Update task error:', error);
        res.status(500).json({ message: "Failed to update task", success: false });
    }   
};

const deleteTaskById = async (req, res) => {
    try {
        const id = req.params.id;

        // Validation
        if (!id) {
            return res.status(400).json({ message: "Task ID is required", success: false });
        }

        const deletedTask = await TaskModel.findByIdAndDelete(id);
        
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found", success: false });
        }

        res.status(200).json({ message: "Task deleted successfully", success: true });
    }
    catch (error) {
        console.error('Delete task error:', error);
        res.status(500).json({ message: "Failed to delete task", success: false });
    }   
};

module.exports = { 
    createTask,
    fetchAllTasks,
    updateTaskById,
    deleteTaskById
};


