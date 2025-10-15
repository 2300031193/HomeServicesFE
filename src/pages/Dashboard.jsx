import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { useAuth } from '../contexts/AuthContext';
import { getBookings, updateBookingStatus } from '../data/bookingStorage';
import AnimatedButton from '../components/AnimatedButton';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setBookings(getBookings());
  }, []);

  const upcomingBookings = bookings.filter(
    (b) => new Date(b.date) >= new Date() && b.status === 'Scheduled'
  );
  const pastBookings = bookings.filter(
    (b) => new Date(b.date) < new Date() || b.status !== 'Scheduled'
  );

  const totalSpent = bookings.reduce((acc, b) => acc + b.price, 0);

  const bookingsByMonth = bookings.reduce((acc, b) => {
    const month = new Date(b.date).toLocaleString('default', { month: 'short' });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const lineChartData = {
    labels: Object.keys(bookingsByMonth),
    datasets: [
      {
        label: 'Bookings',
        data: Object.values(bookingsByMonth),
        fill: true,
        backgroundColor: 'rgba(52, 101, 109, 0.2)',
        borderColor: '#34656D',
        tension: 0.4,
      },
    ],
  };

  const bookingsByService = bookings.reduce((acc, b) => {
    acc[b.service] = (acc[b.service] || 0) + 1;
    return acc;
  }, {});

  const doughnutChartData = {
    labels: Object.keys(bookingsByService),
    datasets: [
      {
        label: 'Services',
        data: Object.values(bookingsByService),
        backgroundColor: [
          '#34656D',
          '#334443',
          '#FAEAB1',
          '#E5E7EB',
          '#F9A8D4',
        ],
      },
    ],
  };

  const bookingsByStatus = bookings.reduce((acc, b) => {
    acc[b.status] = (acc[b.status] || 0) + 1;
    return acc;
  }, {});

  const barChartData = {
    labels: Object.keys(bookingsByStatus),
    datasets: [
      {
        label: 'Status',
        data: Object.values(bookingsByStatus),
        backgroundColor: [
          '#FAEAB1',
          '#34656D',
          '#334443',
          '#E5E7EB',
        ],
      },
    ],
  };

  const handleCancelBooking = (bookingId) => {
    updateBookingStatus(bookingId, 'Cancelled');
    setBookings(getBookings());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-cream to-light-yellow p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-5xl font-bold text-charcoal mb-2">
          Welcome, {user?.name}!
        </h1>
        <p className="text-xl text-charcoal">
          Your personal command center for home services.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <motion.div
          className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20"
          whileHover={{ y: -5, scale: 1.02 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-teal-dark rounded-full flex items-center justify-center text-white text-2xl">
              🎫
            </div>
            <h2 className="text-2xl font-bold text-charcoal">Total Bookings</h2>
          </div>
          <p className="text-5xl font-bold text-teal-dark">{bookings.length}</p>
        </motion.div>
        <motion.div
          className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20"
          whileHover={{ y: -5, scale: 1.02 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-teal-dark rounded-full flex items-center justify-center text-white text-2xl">
              💰
            </div>
            <h2 className="text-2xl font-bold text-charcoal">Total Spent</h2>
          </div>
          <p className="text-5xl font-bold text-teal-dark">₹{totalSpent}</p>
        </motion.div>
        <motion.div
          className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20"
          whileHover={{ y: -5, scale: 1.02 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-teal-dark rounded-full flex items-center justify-center text-white text-2xl">
              📅
            </div>
            <h2 className="text-2xl font-bold text-charcoal">Upcoming</h2>
          </div>
          <p className="text-5xl font-bold text-teal-dark">
            {upcomingBookings.length}
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
        <motion.div
          className="lg:col-span-3 bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-charcoal mb-6">
            Bookings Over Time
          </h2>
          <div className="h-64">
            <Line data={lineChartData} options={{ maintainAspectRatio: false }} />
          </div>
        </motion.div>
        <motion.div
          className="lg:col-span-2 bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-charcoal mb-6">
            Service Distribution
          </h2>
          <div className="h-64">
            <Doughnut data={doughnutChartData} options={{ maintainAspectRatio: false }} />
          </div>
        </motion.div>
      </div>

      <motion.div
        className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <h2 className="text-2xl font-bold text-charcoal mb-6">
          Booking Status
        </h2>
        <div className="h-64">
          <Bar data={barChartData} options={{ maintainAspectRatio: false }} />
        </div>
      </motion.div>

      <motion.div
        className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <h2 className="text-3xl font-bold text-charcoal mb-6">
          Upcoming Bookings
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b-2 border-charcoal">
              <tr>
                <th className="p-4 text-lg font-bold text-charcoal">Service</th>
                <th className="p-4 text-lg font-bold text-charcoal">Provider</th>
                <th className="p-4 text-lg font-bold text-charcoal">Date</th>
                <th className="p-4 text-lg font-bold text-charcoal">Price</th>
                <th className="p-4 text-lg font-bold text-charcoal">Status</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {upcomingBookings.map((booking) => (
                <motion.tr
                  key={booking.id}
                  className="border-b border-gray-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <td className="p-4 text-charcoal">{booking.service}</td>
                  <td className="p-4 text-charcoal">{booking.provider}</td>
                  <td className="p-4 text-charcoal">{booking.date}</td>
                  <td className="p-4 font-bold text-teal-dark">₹{booking.price}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-light-yellow text-charcoal">
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-4">
                    {booking.status === 'Scheduled' && (
                      <AnimatedButton
                        onClick={() => handleCancelBooking(booking.id)}
                        className="bg-red-500 text-white text-sm"
                      >
                        Cancel
                      </AnimatedButton>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
