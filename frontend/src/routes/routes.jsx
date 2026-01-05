import { Routes, Route } from 'react-router-dom';
import LandingPage from "../pages/LandingPage"
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* Default route */}
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
};

export default AppRoutes;