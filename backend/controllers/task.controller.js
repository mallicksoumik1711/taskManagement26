const tasks = require("../models/tasks.model");

const getAllTasks = async (req, res) => {
  try {
    let allTasks;
    if (req.user.role === "Admin") {
      allTasks = await tasks.find();
    } else {
      allTasks = await tasks.find({ createdBy: req.user._id });
    }
    res.status(200).json({ tasks: allTasks });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching tasks", error: err.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, status } = req.body;
    const newTask = await tasks.create({
      title,
      description,
      dueDate,
      priority,
      status,
      createdBy: req.user._id,
    });
    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating task", error: err.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await tasks.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ task });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching task", error: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, dueDate, priority, status } = req.body;
    const task = await tasks.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.createdBy.toString() !== req.user._id.toString() && req.user.role !== "Admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const updateTask = await tasks.findByIdAndUpdate(
      taskId,
      {
        title,
        description,
        dueDate,
        priority,
        status,
      },
      { new: true, runValidators: true }
    );
    res
      .status(200)
      .json({ message: "Task updated successfully", task: updateTask });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating task", error: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await tasks.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.createdBy.toString() !== req.user._id.toString() && req.user.role !== "Admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    await tasks.findByIdAndDelete(taskId);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting task", error: err.message });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
};
