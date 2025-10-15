import React from 'react';
import { motion } from 'framer-motion';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const userData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'New Users',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: 'rgba(52, 101, 109, 0.8)',
        borderColor: 'rgba(52, 101, 109, 1)',
        borderWidth: 1,
      },
    ],
  };

  const revenueData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Revenue',
        data: [1200, 1900, 3000, 5000, 2300, 3200],
        fill: false,
        borderColor: '#34656D',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="min-h-screen flex bg-gray-100 font-sans">
      {/* Sidebar */}
      <motion.div 
        className="w-64 bg-charcoal text-white flex flex-col shadow-2xl"
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.6, ease: "cubic-bezier(0.25, 1, 0.5, 1)" }}
      >
        <div className="p-5 border-b border-gray-700 flex items-center space-x-4">
          <div className="p-2 bg-teal-dark rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0v7l-9-5" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <nav className="flex-1 p-5">
          <ul className="space-y-3">
            <li>
              <a href="#" className="flex items-center p-3 rounded-lg bg-teal-dark font-bold">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197" /></svg>
                Users
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                Services
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                Bookings
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </motion.div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <motion.div 
          className="bg-white shadow-md p-4 flex justify-between items-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-charcoal">Welcome, Admin!</h2>
          <button className="bg-teal-dark text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors shadow-lg">
            Logout
          </button>
        </motion.div>
        <div className="p-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-teal-dark" variants={cardVariants}>
              <h3 className="text-lg font-semibold text-charcoal mb-2">Total Users</h3>
              <p className="text-4xl font-bold text-teal-dark">1,234</p>
            </motion.div>
            <motion.div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-light-yellow" variants={cardVariants}>
              <h3 className="text-lg font-semibold text-charcoal mb-2">Total Services</h3>
              <p className="text-4xl font-bold text-light-yellow">56</p>
            </motion.div>
            <motion.div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-charcoal" variants={cardVariants}>
              <h3 className="text-lg font-semibold text-charcoal mb-2">Total Bookings</h3>
              <p className="text-4xl font-bold text-charcoal">4,567</p>
            </motion.div>
            <motion.div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500" variants={cardVariants}>
              <h3 className="text-lg font-semibold text-charcoal mb-2">Revenue</h3>
              <p className="text-4xl font-bold text-red-500">₹12,34,567</p>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <motion.div className="bg-white rounded-xl shadow-lg p-6" variants={cardVariants} initial="hidden" animate="visible">
              <h3 className="text-xl font-semibold text-charcoal mb-4">User Growth</h3>
              <Bar data={userData} />
            </motion.div>
            <motion.div className="bg-white rounded-xl shadow-lg p-6" variants={cardVariants} initial="hidden" animate="visible">
              <h3 className="text-xl font-semibold text-charcoal mb-4">Revenue Trend</h3>
              <Line data={revenueData} />
            </motion.div>
          </div>

          <motion.div className="bg-white rounded-xl shadow-lg p-6" variants={cardVariants} initial="hidden" animate="visible">
            <h3 className="text-xl font-semibold text-charcoal mb-4">Recent Bookings</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3">Service</th>
                    <th className="p-3">User</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-3">Plumbing</td>
                    <td className="p-3">John Doe</td>
                    <td className="p-3">2025-10-08</td>
                    <td className="p-3"><span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">Completed</span></td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-3">Electrical</td>
                    <td className="p-3">Jane Smith</td>
                    <td className="p-3">2025-10-07</td>
                    <td className="p-3"><span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">In Progress</span></td>
                  </tr>
                   <tr className="border-b hover:bg-gray-50">
                    <td className="p-3">Cleaning</td>
                    <td className="p-3">Mike Johnson</td>
                    <td className="p-3">2025-10-06</td>
                    <td className="p-3"><span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold">Cancelled</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}