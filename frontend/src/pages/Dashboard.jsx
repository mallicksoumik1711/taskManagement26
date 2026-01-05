

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import TaskBoard from "../components/TaskBoard";
import TaskDrawer from "../components/TaskDrawer";
import taskService from "../services/task.service";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await taskService.getAllTasks();
      setTasks(res.data.tasks);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (taskData) => {
    try {
      const res = await taskService.createTask(taskData);
      console.log("Task created:", res.data);
      setTasks((prev) => [...prev, res.data]); // update local state
    } catch (error) {
      console.error("Failed to create task:", error.response?.data || error);
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      const res = await taskService.updateTask(taskData._id, taskData);
      console.log("Task updated:", res.data);
      setTasks((prev) =>
        prev.map((t) => (t._id === taskData._id ? res.data : t))
      );
    } catch (err) {
      console.error("Failed to update task:", err.response?.data || err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      console.log("Task deleted:", taskId);
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
    } catch (err) {
      console.error("Failed to delete task:", err.response?.data || err);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setOpenDrawer(true);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-h-0">
        <Header />
        <main className="flex-1 p-8 overflow-hidden min-h-0 flex flex-col">
          <div className="flex items-center justify-between mb-8 shrink-0">
            <h2 className="text-3xl font-bold text-gray-800">Tasks</h2>
            <button
              onClick={() => {
                setEditingTask(null);
                setOpenDrawer(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <span>+</span>
              New task
            </button>
          </div>

          <div className="flex-1 min-h-0">
            <TaskBoard
              tasks={tasks}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
          </div>
        </main>
      </div>

      <TaskDrawer
        open={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
          setEditingTask(null);
        }}
        onSubmit={(taskData) => {
          if (editingTask) {
            handleUpdateTask(taskData);
          } else {
            handleCreateTask(taskData);
          }
          setOpenDrawer(false);
          setEditingTask(null);
        }}
        task={editingTask}
      />
    </div>
  );
}

