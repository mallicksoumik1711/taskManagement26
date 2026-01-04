import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import TaskBoard from "../components/TaskBoard";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-h-0">
        <Header />
        <main className="flex-1 p-8 overflow-hidden min-h-0 flex flex-col">
          
          <div className="flex items-center justify-between mb-8 shrink-0">
            <h2 className="text-3xl font-bold text-gray-800">Tasks</h2>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <span>+</span>
              New task
            </button>
          </div>
          
          <div className="flex-1 min-h-0">
            <TaskBoard />
          </div>

        </main>
      </div>
    </div>
  );
}
