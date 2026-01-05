import { X } from "lucide-react";
import { useState, useEffect } from "react";

export default function TaskDrawer({ open, onClose, onSubmit, task }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Pending"); 
  useEffect(() => {
    if (!open) return; 

    setTitle(task?.title || "");
    setDescription(task?.description || "");
    setPriority(task?.priority || "Medium");
    setStatus(task?.status || "Pending"); 
  }, [task, open]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...task, 
      title,
      description,
      priority,
      status: task ? status : "Pending",
      dueDate: task?.dueDate || new Date().toISOString(),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex">

      <div className="flex-1 bg-black/30" onClick={onClose} />


      <div className="w-[400px] bg-white h-full shadow-xl p-6 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">
            {task ? "Edit Task" : "New Task"}
          </h3>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium">Title</label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-1 border rounded-lg px-3 py-2"
              placeholder="Task title"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-1 border rounded-lg px-3 py-2 resize-none"
              rows={4}
              placeholder="Task details"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full mt-1 border rounded-lg px-3 py-2"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>


          {task && (
            <div>
              <label className="text-sm font-medium">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full mt-1 border rounded-lg px-3 py-2"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            {task ? "Update Task" : "Create Task"}
          </button>
        </form>
      </div>
    </div>
  );
}
