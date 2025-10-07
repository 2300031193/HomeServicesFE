import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import RatingStars from "../components/RatingStars";
import providersMock from "../data/providersMock";

export default function ProviderProfile() {
  const { id } = useParams();
  const provider = providersMock.find(p => String(p.id) === id) || providersMock[0];

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 py-10"
      initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
      animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-accent to-orange-400 text-white">
          <div className="px-6 py-8 md:px-8 md:py-10">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <img
                src={provider.avatar || '/placeholder-avatar.jpg'}
                alt={`${provider.name} profile`}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
              <div className="text-center sm:text-left">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{provider.name}</h1>
                <p className="text-lg opacity-90 mb-3">{provider.specialty}</p>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <RatingStars rating={provider.rating} reviewCount={provider.reviewCount} size="lg" />
                  <div className="text-sm opacity-75">
                    {provider.completedBookings} completed bookings
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="px-6 py-8 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* About */}
            <section>
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {provider.bio || `${provider.name} is a certified ${provider.specialty} with ${provider.experience} years of experience. They are rated ${provider.rating.toFixed(1)} out of 5 based on ${provider.reviewCount} customer reviews.`}
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl" aria-hidden="true">🛠️</span>
                  <span><strong>Experience:</strong> {provider.experience} years</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl" aria-hidden="true">✔️</span>
                  <span><strong>Certified:</strong> Yes</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl" aria-hidden="true">🌍</span>
                  <span><strong>Serves:</strong> {provider.location || 'Your area'}</span>
                </div>
              </div>
            </section>

            {/* Services */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Services Offered</h2>
              <div className="space-y-3">
                {provider.services?.map((service, index) => (
                  <motion.div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    initial={reduceMotion ? {} : { opacity: 0, x: 10 }}
                    animate={reduceMotion ? {} : { opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="font-medium">{service.name}</span>
                    <span className="text-accent font-semibold">₹{service.price}</span>
                  </motion.div>
                )) || (
                  <>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Basic Service</span>
                      <span className="text-accent font-semibold">₹{provider.price || 499}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Advanced Service</span>
                      <span className="text-accent font-semibold">₹{provider.price ? provider.price + 200 : 699}</span>
                    </div>
                  </>
                )}
              </div>
            </section>
          </div>

          {/* Reviews */}
          {provider.reviews && provider.reviews.length > 0 && (
            <section className="mt-8 pt-8 border-t">
              <h2 className="text-xl font-semibold mb-4">Recent Reviews</h2>
              <div className="space-y-4">
                {provider.reviews.map((review, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4"
                    initial={reduceMotion ? {} : { opacity: 0, y: 10 }}
                    animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-medium">{review.author}</span>
                      <RatingStars rating={review.rating} size="sm" />
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Contact/Booking CTA */}
          <motion.div
            className="mt-8 bg-accent text-white rounded-xl p-6 text-center"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <h3 className="text-xl font-bold mb-2">Ready to book with {provider.name.split(' ')[0]}?</h3>
            <p className="mb-4 opacity-90">
              Professional service guaranteed. Get your job done right the first time.
            </p>
            <button
              className="bg-white text-accent px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              aria-label={`Book service with ${provider.name}`}
            >
              Book Now
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}