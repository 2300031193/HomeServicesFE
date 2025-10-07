// Simple booking storage using localStorage
export const getBookings = () => {
  try {
    const bookings = localStorage.getItem('homeServices-bookings');
    return bookings ? JSON.parse(bookings) : [
      {
        id: "B001",
        service: "Plumbing",
        date: "2025-10-15",
        time: "10:00 AM",
        status: "Scheduled",
        provider: "Mike Johnson",
        price: 499,
        address: "123 Main St, City"
      },
      {
        id: "B002",
        service: "AC Repair",
        date: "2025-10-20",
        time: "2:30 PM",
        status: "Completed",
        provider: "Emily Rodriguez",
        price: 1299,
        address: "456 Oak Ave, City"
      },
      {
        id: "B003",
        service: "House Cleaning",
        date: "2025-10-12",
        time: "9:00 AM",
        status: "In Progress",
        provider: "Juan Carlos",
        price: 899,
        address: "789 Pine Rd, City"
      }
    ];
  } catch (error) {
    console.error('Error reading bookings:', error);
    return [];
  }
};

export const addBooking = (booking) => {
  try {
    const bookings = getBookings();
    const newBooking = {
      ...booking,
      id: `B${String(bookings.length + 1).padStart(3, '0')}`,
      status: "Scheduled"
    };
    bookings.push(newBooking);
    localStorage.setItem('homeServices-bookings', JSON.stringify(bookings));
    return newBooking;
  } catch (error) {
    console.error('Error saving booking:', error);
    return null;
  }
};

export const updateBookingStatus = (bookingId, newStatus) => {
  try {
    const bookings = getBookings();
    const bookingIndex = bookings.findIndex(b => b.id === bookingId);
    if (bookingIndex !== -1) {
      bookings[bookingIndex].status = newStatus;
      localStorage.setItem('homeServices-bookings', JSON.stringify(bookings));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating booking:', error);
    return false;
  }
};

export const getBookingStats = () => {
  const bookings = getBookings();
  return {
    total: bookings.length,
    active: bookings.filter(b => b.status === 'Scheduled' || b.status === 'In Progress').length,
    totalSpent: bookings.reduce((sum, b) => sum + (b.price || 0), 0)
  };
};