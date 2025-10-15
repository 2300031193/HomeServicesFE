import React from 'react';
import { updateBookingStatus } from '../data/bookingStorage';

const BookingList = ({ bookings, setBookings }) => {

  const handleUpdateStatus = (bookingId, newStatus) => {
    const success = updateBookingStatus(bookingId, newStatus);
    if (success) {
      const updatedBookings = bookings.map(booking => 
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      );
      setBookings(updatedBookings);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mt-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">All Bookings</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.service?.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.user?.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.user?.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleUpdateStatus(booking.id, 'Approved')} className="text-green-600 hover:text-green-900 mr-4">Approve</button>
                  <button onClick={() => handleUpdateStatus(booking.id, 'Cancelled')} className="text-red-600 hover:text-red-900">Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingList;