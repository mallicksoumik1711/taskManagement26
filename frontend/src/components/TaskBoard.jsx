
import TaskColumn from './TaskColumn';

export default function TaskBoard({ tasks, onEditTask, onDeleteTask }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full min-h-0">
      <TaskColumn
        title="Pending"
        tasks={tasks.filter((t) => t.status === "Pending")}
        onEdit={onEditTask}
        onDelete={onDeleteTask}
      />
      <TaskColumn
        title="In Progress"
        tasks={tasks.filter((t) => t.status === "In Progress")}
        onEdit={onEditTask}
        onDelete={onDeleteTask}
      />
      <TaskColumn
        title="Completed"
        tasks={tasks.filter((t) => t.status === "Completed")}
        onEdit={onEditTask}
        onDelete={onDeleteTask}
      />
    </div>
  );
}


