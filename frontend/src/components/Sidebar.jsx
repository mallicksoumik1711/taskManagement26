import { LayoutDashboard, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import authService from '../services/auth.service';

export default function Sidebar() {
  const [active, setActive] = useState('dashboard');
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard /> },
  ];

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
      alert("Logout failed");
    }
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
      <div className="px-6 py-5 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-blue-600">Task-manager</h1>
      </div>

      <nav className="flex-1 p-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              active === item.id
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
          <span className="text-xl"><LogOut /></span>
          <span className="font-medium">Log out</span>
        </button>
      </div>
    </aside>
  );
}