import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiClipboard, FiBriefcase } from 'react-icons/fi';
import servicesMock from '../data/servicesMock';
import { getBookings } from '../data/bookingStorage';
import UserList from '../components/UserList';
import ServiceList from '../components/ServiceList';

import BookingList from '../components/BookingList';

const StatCard = ({ icon, label, value, color }) => (
  <motion.div 
    className={`p-6 rounded-2xl shadow-lg flex items-center space-x-4 bg-white`}
    whileHover={{ scale: 1.05, shadow: "xl" }}
  >
    <div className={`p-4 rounded-full ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-lg font-semibold text-gray-600">{label}</p>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
  </motion.div>
);

const AdminDashboard = () => {
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);
  const [services, setServices] = useState(servicesMock);
  const [bookings, setBookings] = useState(getBookings());

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <motion.h1 
        className="text-4xl font-bold text-gray-800 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Admin Dashboard
      </motion.h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        <StatCard icon={<FiUsers size={32} className="text-white" />} label="Total Users" value={users.length} color="bg-blue-500" />
        <StatCard icon={<FiClipboard size={32} className="text-white" />} label="Total Services" value={services.length} color="bg-green-500" />
        <StatCard icon={<FiBriefcase size={32} className="text-white" />} label="Total Bookings" value={bookings.length} color="bg-purple-500" />
      </div>

      <div className="grid grid-cols-1 gap-8">
        <UserList users={users} setUsers={setUsers} />
        <ServiceList services={services} setServices={setServices} />
        <BookingList bookings={bookings} setBookings={setBookings} />
      </div>
    </div>
  );
};

export default AdminDashboard;