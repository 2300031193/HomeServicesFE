import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import servicesMock from '../data/servicesMock';
import { gsap } from 'gsap';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState(servicesMock);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [newService, setNewService] = useState({
    title: '',
    category: '',
    price: '',
  });

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  useEffect(() => {
    gsap.from('.admin-content', {
      duration: 0.5,
      y: 50,
      opacity: 0,
      ease: 'power3.out',
    });
  }, [activeTab]);

  const handleCreateService = (e) => {
    e.preventDefault();
    const newServiceWithId = { ...newService, id: services.length + 1 };
    setServices([...services, newServiceWithId]);
    setNewService({ title: '', category: '', price: '' });
  };

  const handleDeleteService = (serviceId) => {
    setServices(services.filter((service) => service.id !== serviceId));
  };

  const chartData = {
    labels: services.map((s) => s.title),
    datasets: [
      {
        label: 'Price',
        data: services.map((s) => s.price),
        backgroundColor: 'rgba(52, 101, 109, 0.8)',
        borderColor: 'rgba(52, 101, 109, 1)',
        borderWidth: 1,
      },
    ],
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return (
          <motion.div
            key="users"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="admin-content"
          >
            <h2 className="text-3xl font-bold text-charcoal mb-6">Users</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-4">{user.name}</td>
                      <td className="p-4">{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        );
      case 'services':
        return (
          <motion.div
            key="services"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="admin-content"
          >
            <h2 className="text-3xl font-bold text-charcoal mb-6">
              Services
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-charcoal mb-4">
                  Create Service
                </h3>
                <form onSubmit={handleCreateService}>
                  {/* Form inputs */}
                </form>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-charcoal mb-4">
                  All Services
                </h3>
                <div className="overflow-y-auto h-96">
                  <table className="w-full text-left">
                    {/* Table content */}
                  </table>
                </div>
              </div>
            </div>
          </motion.div>
        );
      default:
        return (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="admin-content"
          >
            <h2 className="text-3xl font-bold text-charcoal mb-6">
              Dashboard
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-charcoal mb-4">
                  Total Users
                </h3>
                <p className="text-5xl font-bold text-teal-dark">
                  {users.length}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-charcoal mb-4">
                  Total Services
                </h3>
                <p className="text-5xl font-bold text-teal-dark">
                  {services.length}
                </p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-charcoal mb-4">
                Service Prices
              </h3>
              <div className="h-96">
                <Bar data={chartData} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-light-cream flex">
      <aside className="w-64 bg-charcoal text-white p-8">
        <h1 className="text-3xl font-bold mb-8">Admin</h1>
        <nav>
          <ul>
            <li className="mb-4">
              <button
                onClick={() => setActiveTab('dashboard')}
                className="font-bold"
              >
                Dashboard
              </button>
            </li>
            <li className="mb-4">
              <button
                onClick={() => setActiveTab('users')}
                className="font-bold"
              >
                Users
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('services')}
                className="font-bold"
              >
                Services
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
      </main>
    </div>
  );
}
