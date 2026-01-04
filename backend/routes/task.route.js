const express = require("express");
const router = express.Router();
const { getAllTasks, createTask, getTaskById, updateTask, deleteTask } = require("../controllers/task.controller");

router.get("/all", getAllTasks);
router.post("/create", createTask);
router.get("/task/:id", getTaskById);
router.put("/update/:id", updateTask);
router.delete("/delete/:id", deleteTask);

module.exports = router;
