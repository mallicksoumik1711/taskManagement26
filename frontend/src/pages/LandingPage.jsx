import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">

      <header className="px-6 py-4 md:px-12 lg:px-24">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">Task-Manager</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-gray-600">
            <a href="#" className="hover:text-gray-900">Features</a>
            <a href="#" className="hover:text-gray-900">Solutions</a>
            <a href="#" className="hover:text-gray-900">Plans</a>
            <a href="#" className="hover:text-gray-900">Pricing</a>
            <a href="#" className="hover:text-gray-900">Resources</a>
            <a href="#" className="hover:text-gray-900">Blog</a>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-gray-700 font-medium hover:text-gray-900">Login</Link>
            <Link to="/register" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700">Register</Link>
          </div>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center mt-8 mb-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight max-w-4xl">
          Effortless to-do list for<br />
          seamless management
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl">
          Inspires teams to dream bigger, reach beyond their goals,<br className="hidden md:block" />
          bring team members together and celebrate success.
        </p>

        <div className="mt-16 max-w-5xl w-full">
          <div className="bg-gray-100 rounded-2xl shadow-2xl overflow-hidden">
            <img
              src="https://cdn.dribbble.com/userupload/14190626/file/original-d263748f8a1ff9e64e3d7494fe4dd5e6.jpg"
              alt="Tuduu App Dashboard - Projects, Tasks, and Collaboration"
              className="w-full object-cover"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;