import TaskColumn from './TaskColumn';
import { mockTasks } from '../utils/mockTasks';

export default function TaskBoard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full min-h-0">
      <TaskColumn title="Pending" tasks={mockTasks.slice(0, 5)} />
      <TaskColumn title="In progress" tasks={mockTasks.slice(5, 10)} />
      <TaskColumn title="Completed" tasks={mockTasks.slice(10, 15)} />
    </div>
  );
}


