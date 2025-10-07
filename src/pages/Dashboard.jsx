import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AnimatedButton from "../components/AnimatedButton";
import Notification from "../components/Notification";
import { getBookings, updateBookingStatus, getBookingStats } from "../data/bookingStorage";

export default function Dashboard() {
  const [notification, setNotification] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, totalSpent: 0 });

  useEffect(() => {
    // Load initial data
    updateDashboardData();
  }, []);

  const updateDashboardData = () => {
    const bookingData = getBookings();
    const statistics = getBookingStats();

    setBookings(bookingData);
    setStats(statistics);
  };

  const handleCancelBooking = (bookingId) => {
    const success = updateBookingStatus(bookingId, 'Cancelled');
    if (success) {
      updateDashboardData(); // Refresh the data
      setNotification({ type: 'info', message: 'Booking has been cancelled.' });
      setTimeout(() => setNotification(null), 3000);
    } else {
      setNotification({ type: 'error', message: 'Failed to cancel booking.' });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString; // Fallback to original string
    }
  };

  const activeBookings = bookings.filter(b => b.status !== 'Cancelled');

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 pt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Dashboard</h1>
            <p className="text-gray-600">Manage your bookings and track service history</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-4">
            <button className="text-orange-600 hover:text-orange-700 transition-colors">
              Book New Service
            </button>
            <button className="text-gray-600 hover:text-gray-800">
              Settings
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Total Bookings', value: stats.total, color: 'text-blue-600' },
            { label: 'Active Bookings', value: stats.active, color: 'text-green-600' },
            { label: 'Total Spent', value: `₹${stats.totalSpent}`, color: 'text-purple-600' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white rounded-xl shadow-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`${stat.color} text-3xl md:text-4xl font-bold mb-1`}>{stat.value}</div>
              <div className="text-sm md:text-base text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Bookings List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Your Bookings</h2>
          </div>

          {bookings.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings yet</h3>
              <p className="text-gray-600 mb-6">Start by booking your first service!</p>
              <AnimatedButton>Book a Service</AnimatedButton>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {bookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  className="px-6 py-6 hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{booking.service}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                          booking.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                          booking.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex items-center gap-2">
                          <span>📅</span>
                          <span>{formatDate(booking.date)} at {booking.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>👨‍🔧</span>
                          <span>{booking.provider}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>📍</span>
                          <span>{booking.address}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-lg font-semibold text-orange-600">₹{booking.price}</div>
                        <div className="text-sm text-gray-500">Total</div>
                      </div>
                      {booking.status === 'Scheduled' && (
                        <AnimatedButton
                          onClick={() => handleCancelBooking(booking.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2"
                          ariaLabel={`Cancel booking ${booking.id}`}
                        >
                          Cancel
                        </AnimatedButton>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <motion.div
          className="mt-8 bg-gray-50 rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <AnimatedButton className="bg-orange-500 hover:bg-orange-600 text-white">
              Book Another Service
            </AnimatedButton>
            <AnimatedButton className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
              View Favorites
            </AnimatedButton>
            <AnimatedButton className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
              Contact Support
            </AnimatedButton>
          </div>
        </motion.div>

        {/* Notification */}
        {notification && (
          <Notification
            type={notification.type}
            message={notification.message}
            duration={3000}
            onClose={() => setNotification(null)}
          />
        )}
      </div>
    </motion.div>
  );
}