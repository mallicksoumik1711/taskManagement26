
import { Pencil, Trash2, Calendar } from "lucide-react";

export default function TaskCard({ task, onEdit, onDelete }) {
  const priorityColor = {
    Low: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    High: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <h4 className="font-semibold text-gray-800 text-sm">{task.title}</h4>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit?.(task)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Pencil className="w-4 h-4 text-gray-500" />
          </button>

          <button
            onClick={() => onDelete?.(task._id)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>

      {task.description && (
        <p className="text-sm text-gray-600 line-clamp-2">{task.description}</p>
      )}

      <div className="flex items-center justify-between text-xs mt-2">
        <span
          className={`px-2 py-1 rounded-full font-medium ${
            priorityColor[task.priority]
          }`}
        >
          {task.priority}
        </span>

        {task.dueDate && (
          <div className="flex items-center gap-1 text-gray-500">
            <Calendar className="w-3 h-3" />
            {new Date(task.dueDate).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
}
