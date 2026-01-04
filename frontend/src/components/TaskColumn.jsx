import TaskCard from './TaskCard';

export default function TaskColumn({ title, tasks }) {
  return (
    <div className="bg-gray-100 rounded-2xl p-6 flex flex-col h-full min-h-0">
      
      <h3 className="text-lg font-semibold mb-4 shrink-0">
        {title}
      </h3>

      {/* ONLY THIS SCROLLS */}
      <div className="flex-1 min-h-0 overflow-y-auto space-y-4 pr-2">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

    </div>
  );
}


