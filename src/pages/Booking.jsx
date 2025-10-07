import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import services from "../data/servicesMock";
import { addBooking } from "../data/bookingStorage";
import BookingForm from "../components/BookingForm";
import AnimatedButton from "../components/AnimatedButton";

export default function Booking() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Find the service by ID
    const foundService = services.find(s => s.id.toString() === serviceId);
    if (foundService) {
      setService(foundService);
    } else {
      setError('Service not found');
    }
  }, [serviceId]);

  const handleBookingSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Create booking data with accurate service information
      const bookingData = {
        service: service.title,
        date: formData.date,
        time: formData.time,
        provider: "Professional Service Provider", // In a real app, this would be assigned
        price: service.price,
        address: formData.address,
        notes: formData.notes,
        serviceId: service.id
      };

      // Save booking to storage
      const newBooking = addBooking(bookingData);

      if (newBooking) {
        setIsLoading(false);
        setShowSuccess(true);

        // Navigate to dashboard after brief delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      } else {
        setError('Failed to create booking. Please try again.');
        setIsLoading(false);
      }
    } catch (err) {
      setError('An error occurred while creating your booking.');
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(`/service/${serviceId}`);
  };

  if (error) {
    return (
      <motion.div
        className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 pt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <AnimatedButton onClick={() => navigate('/services')}>
              View All Services
            </AnimatedButton>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!service) {
    return (
      <motion.div
        className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 pt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
            <p className="text-gray-600">Loading service details...</p>
          </div>
        </div>
      </motion.div>
    );
  }

  if (isLoading) {
    return (
      <motion.div
        className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 pt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-accent mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Creating Your Booking</h2>
            <p className="text-gray-600">Please wait while we process your service request...</p>
          </div>
        </div>
      </motion.div>
    );
  }

  if (showSuccess) {
    return (
      <motion.div
        className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 pt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            >
              <div className="text-6xl mb-4">✅</div>
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
            <p className="text-gray-600 mb-6">
              Your service has been scheduled successfully. We've sent a confirmation email with all the details.
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Redirecting you to your dashboard in a few seconds...
            </p>
            <div className="flex gap-4 justify-center">
              <AnimatedButton onClick={() => navigate('/dashboard')}>
                Go to Dashboard
              </AnimatedButton>
              <AnimatedButton
                onClick={() => navigate('/')}
                className="bg-gray-200 text-gray-800 hover:bg-gray-300"
              >
                Home
              </AnimatedButton>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 pt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Book Your Service</h1>
          <p className="text-gray-600">Complete the form below to schedule your service</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Service Summary */}
          <motion.div
            className="lg:order-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Service Summary</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{service.icon}</div>
                  <div>
                    <h3 className="font-semibold">{service.title}</h3>
                    <p className="text-sm text-gray-600">{service.short}</p>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <p className="text-2xl font-bold text-orange-600 mb-2">₹{service.price}</p>
                  <p className="text-sm text-gray-600">Service fee (plus any applicable taxes)</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">What's Included:</h4>
                  <ul className="text-sm space-y-1">
                    {service.includes.map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span>✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            className="lg:order-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <BookingForm
                service={service}
                onSubmit={handleBookingSubmit}
                onCancel={handleCancel}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}