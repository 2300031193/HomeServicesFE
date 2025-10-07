// Simple booking storage using localStorage
export const getBookings = () => {
  try {
    const bookings = localStorage.getItem('homeServices-bookings');
    return bookings ? JSON.parse(bookings) : [];
  } catch (error) {
    console.error('Error reading bookings:', error);
    return [];
  }
};

// Clear all bookings (for development/testing)
export const clearAllBookings = () => {
  try {
    localStorage.removeItem('homeServices-bookings');
    return true;
  } catch (error) {
    console.error('Error clearing bookings:', error);
    return false;
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