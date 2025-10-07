import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedButton from "../components/AnimatedButton";
import ProviderCard from "../components/ProviderCard";
import RatingStars from "../components/RatingStars";
import servicesMock from "../data/servicesMock";
import providersMock from "../data/providersMock";

export default function ServiceDetail() {
  const { id } = useParams();
  const service = useMemo(() =>
    servicesMock.find(s => String(s.id) === id) || servicesMock[0],
    [id]
  );

  // Mock related providers for this service
  const relatedProviders = useMemo(() =>
    providersMock.filter(p => p.specialty.toLowerCase().includes(service.title.split(' ')[1].toLowerCase())),
    [service]
  );

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <motion.div
      className="max-w-6xl mx-auto px-4 py-10"
      initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
      animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <article className="bg-white rounded-xl shadow-lg overflow-hidden" role="main" aria-labelledby="service-title">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-accent to-orange-400 text-white">
          <div className="px-6 py-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center text-4xl">
                {service.icon}
              </div>
              <div>
                <h1 id="service-title" className="text-3xl md:text-4xl font-bold">{service.title}</h1>
                <p className="text-lg opacity-90">{service.short}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="text-2xl font-bold">₹{service.price}</div>
              <RatingStars rating={4.5} reviewCount={123} size="lg" />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4">About this service</h2>
                <p className="text-gray-700 leading-relaxed">{service.long}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">What's included</h2>
                <ul className="space-y-2">
                  {service.includes?.map((item, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-center gap-3"
                      initial={reduceMotion ? {} : { opacity: 0, x: -10 }}
                      animate={reduceMotion ? {} : { opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <span className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></span>
                      <span>{item}</span>
                    </motion.li>
                  )) || (
                    <>
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-accent rounded-full"></span>
                        <span>Professional assessment</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-accent rounded-full"></span>
                        <span>Quality parts & materials</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-accent rounded-full"></span>
                        <span>Complete installation</span>
                      </li>
                    </>
                  )}
                </ul>
              </section>

              {relatedProviders.length > 0 && (
                <section>
                  <h2 className="text-2xl font-semibold mb-4">Available Providers</h2>
                  <div className="space-y-4">
                    {relatedProviders.slice(0, 3).map(provider => (
                      <ProviderCard key={provider.id} provider={provider} />
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Booking Sidebar */}
            <aside className="space-y-6">
              <motion.div
                className="bg-gray-50 rounded-xl p-6"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <h3 className="text-xl font-semibold mb-4">Book this service</h3>
                <p className="text-gray-600 mb-6">
                  Start with just a few details. Our team will confirm availability and send professional providers.
                </p>

                <div className="space-y-4">
                  <Link to={`/booking/${service.id}`}>
                    <AnimatedButton className="w-full text-center" ariaLabel={`Book ${service.title}`}>
                      Book Now
                    </AnimatedButton>
                  </Link>

                  <div className="text-sm text-gray-500 text-center">
                    <span className="block">⚡ Quick booking</span>
                    <span className="block">🛡️ Insured professionals</span>
                    <span className="block">⭐ Rated providers</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-white border rounded-xl p-6"
                whileHover={{ scale: 1.01 }}
              >
                <h3 className="text-lg font-semibold mb-4">Questions?</h3>
                <p className="text-gray-600 mb-4">
                  Not sure if this service is right for you? We can help clarify details and recommendations.
                </p>
                <Link to="/contact" className="text-accent hover:text-orange-600 font-medium">
                  Contact us →
                </Link>
              </motion.div>
            </aside>
          </div>
        </div>
      </article>
    </motion.div>
  );
}