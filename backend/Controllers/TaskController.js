const TaskModel = require('../Models/TaskModels');


const createTask = async (req, res) => {
    const data = req.body;

    try {
           const model = new TaskModel(data);
           await model.save();
              res.status(201)
              .json({ message: "Task created successfully", success: true });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create task", success: false });
    }   
};

const fetchAllTasks = async (req, res) => {


    try {
           const data = await TaskModel.find({});
           res.status(201)
              .json({ message: "All Tasks", success: true , data });
    }
           catch (error) {
        res.status(500).json({ message: "Failed to create task", success: false });
    }   
};

const updateTaskById = async (req, res) => {


    try {
        const id = req.params.id;
        const body = req.body;
        const obj = { $set: { ...body } };
        const updatedTask = await TaskModel.findByIdAndUpdate(id, obj, { new: true });
           res.status(200)
              .json({ message: "Task updated successfully", success: true , data: updatedTask });
    }
           catch (error) {
        res.status(500).json({ message: "Failed to update task", success: false });
    }   
};


const deleteTaskById = async (req, res) => {


    try {
          const id = req.params.id;
             await TaskModel.findByIdAndDelete(id);

           res.status(200)
              .json({ message: "Task deleted successfully", success: true  });
    }
           catch (error) {
        res.status(500).json({ message: "Failed to delete task", success: false });
    }   
};


module.exports = { 
    createTask ,
    fetchAllTasks,
    updateTaskById,
    deleteTaskById
};


