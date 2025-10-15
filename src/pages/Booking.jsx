import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import services from "../data/servicesMock";
import { addBooking } from "../data/bookingStorage";
import { useAuth } from "../contexts/AuthContext";
import BookingForm from "../components/BookingForm";
import AnimatedButton from "../components/AnimatedButton";

gsap.registerPlugin(ScrollTrigger);

export default function Booking() {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  // Animation refs
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const summaryRef = useRef(null);
  const backgroundRef = useRef(null);

  // Scroll triggers
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  const formScale = useTransform(scrollYProgress, [0.1, 0.3], [1, 1.02]);

  const springHeroY = useSpring(heroY, { stiffness: 400, damping: 40 });

  const [service, setService] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Find the service by ID
    const foundService = services.find(s => s.id.toString() === serviceId);
    if (foundService) {
      setService(foundService);
    } else {
      setError('Service not found');
    }
  }, [serviceId]);

  useEffect(() => {
    if (!service || !containerRef.current) return;

    // Set animation complete after service loads
    const timer = setTimeout(() => setAnimationComplete(true), 500);
    return () => clearTimeout(timer);
  }, [service]);

  useEffect(() => {
    if (!animationComplete || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Background floating animations
      const floatingElements = gsap.utils.toArray('.floating-element');
      floatingElements.forEach((element, index) => {
        gsap.to(element, {
          y: -15 + Math.random() * 30,
          x: -10 + Math.random() * 20,
          rotation: Math.random() * 10 - 5,
          duration: 3 + Math.random() * 3,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          delay: Math.random() * 2
        });
      });

      // Hero section entrance
      const heroTL = gsap.timeline();
      heroTL.fromTo('.booking-hero-title',
        { y: 80, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }
      )
      .fromTo('.booking-hero-subtitle',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.8"
      )
      .fromTo('.booking-service-card',
        { scale: 0.8, opacity: 0, y: 50 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "back.out(1.7)",
          stagger: 0.1
        },
        "-=0.6"
      )
      .fromTo('.booking-form-container',
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo('.booking-summary-container',
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );

      // Scroll-triggered animations
      gsap.fromTo('.booking-step-container',
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.booking-step-container',
            start: "top 85%",
            toggleActions: "play none none reset"
          }
        }
      );

      // Interactive form animations
      const formInputs = gsap.utils.toArray('.booking-form-input');
      formInputs.forEach(input => {
        const wrapper = input.parentElement;
        input.addEventListener('focus', () => {
          gsap.to(wrapper, {
            scale: 1.02,
            duration: 0.2,
            ease: "power2.out"
          });
          gsap.to(wrapper, {
            boxShadow: "0 0 0 3px rgba(79, 70, 229, 0.1)",
            duration: 0.2
          });
        });

        input.addEventListener('blur', () => {
          gsap.to(wrapper, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out"
          });
          gsap.to(wrapper, {
            boxShadow: "0 0 0 0px rgba(79, 70, 229, 0.1)",
            duration: 0.2
          });
        });
      });

      // Button hover animations
      const bookingButtons = gsap.utils.toArray('.booking-button');
      bookingButtons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
          gsap.to(btn, {
            scale: 1.05,
            duration: 0.2,
            ease: "power2.out"
          });
        });

        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out"
          });
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, [animationComplete, service]);

  const { user } = useAuth();

  const handleBookingSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Create booking data with accurate service information
      const bookingData = {
        service: service,
        user: user,
        date: formData.date,
        time: formData.time,
        provider: service.providers ? service.providers[Math.floor(Math.random() * service.providers.length)] : "Professional Service Provider",
        price: service.price,
        address: formData.address,
        notes: formData.notes,
        serviceId: service.id,
      };

      // Save booking to storage
      const newBooking = addBooking(bookingData);

      if (newBooking) {
        setIsLoading(false);
        setShowSuccess(true);

        // Navigate to dashboard after brief delay
        setTimeout(() => {
          navigate('/admin/dashboard');
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
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div ref={backgroundRef} className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="floating-element absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-200 to-green-200 rounded-full opacity-20 blur-xl"></div>
        <div className="floating-element absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-green-200 to-cyan-200 rounded-full opacity-15 blur-lg"></div>
        <div className="floating-element absolute bottom-32 left-32 w-40 h-40 bg-gradient-to-br from-green-200 to-blue-200 rounded-full opacity-10 blur-2xl"></div>
        <div className="floating-element absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-br from-cyan-200 to-green-200 rounded-full opacity-15 blur-lg"></div>
        <div className="floating-element absolute top-96 right-16 w-20 h-20 bg-gradient-to-br from-blue-300 to-green-300 rounded-full opacity-25 blur-md"></div>
        <div className="floating-element absolute bottom-96 left-96 w-36 h-36 bg-gradient-to-br from-green-300 to-blue-300 rounded-full opacity-20 blur-2xl"></div>
      </div>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8"
        style={{ y: springHeroY, opacity: heroOpacity }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="booking-hero-title relative z-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: animationComplete ? 1 : 0, y: animationComplete ? 0 : 50 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-8">
              <span className="text-3xl">{service?.icon}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Book Your
              <span className="block bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                {service?.title}
              </span>
            </h1>
          </motion.div>

          <motion.div
            className="booking-hero-subtitle space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: animationComplete ? 1 : 0, y: animationComplete ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Complete the form below to schedule your service at your convenience.
              Our professional service providers are ready to assist you.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Verified Professionals</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>24/7 Booking</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Money Back Guarantee</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Booking Form Section */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 xl:grid-cols-5 gap-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: animationComplete ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {/* Service Summary - Side Panel */}
            <motion.div
              className="booking-summary-container xl:col-span-2 xl:order-2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: animationComplete ? 1 : 0, x: animationComplete ? 0 : 50 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <div className="sticky top-8 xl:max-w-md mx-auto">
                <motion.div
                  className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl mb-4">
                      <span className="text-2xl">{service?.icon}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{service?.title}</h3>
                    <p className="text-gray-600 text-sm">{service?.short}</p>
                  </div>

                  <div className="space-y-6">
                    <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl">
                      <p className="text-3xl font-bold text-blue-600 mb-1">₹{service?.price}</p>
                      <p className="text-sm text-gray-600">Service fee (incl. taxes)</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        What's Included
                      </h4>
                      <ul className="space-y-3">
                        {service?.includes.map((item, index) => (
                          <motion.li
                            key={index}
                            className="flex items-center gap-3 text-sm"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: animationComplete ? 1 : 0, x: animationComplete ? 0 : -10 }}
                            transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                          >
                            <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t pt-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Est. Duration</span>
                        <span className="font-medium text-gray-900">{service?.duration || "2-4 hours"}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm mt-2">
                        <span className="text-gray-600">Professional Rating</span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-yellow-400">★</span>
                          ))}
                          <span className="ml-1 text-gray-700 font-medium">4.9</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Booking Form - Main Content */}
            <motion.div
              className="booking-form-container xl:col-span-3 xl:order-1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: animationComplete ? 1 : 0, x: animationComplete ? 0 : -50 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              style={{ scale: formScale }}
            >
              <div className="max-w-2xl mx-auto">
                <motion.div
                  className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  {/* Form Header */}
                  <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-6">
                    <h2 className="text-2xl font-bold text-white mb-2">Schedule Your Service</h2>
                    <p className="text-indigo-100 text-sm">Fill out the details below and we'll take care of the rest</p>
                  </div>

                  {/* Form Content */}
                  <div className="p-8">
                    <motion.div
                      className="booking-step-container"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: animationComplete ? 1 : 0 }}
                      transition={{ duration: 0.6, delay: 1 }}
                    >
                      <BookingForm
                        service={service}
                        onSubmit={handleBookingSubmit}
                        onCancel={handleCancel}
                      />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Additional Info */}
                <motion.div
                  className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: animationComplete ? 1 : 0, y: animationComplete ? 0 : 30 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  {[
                    {
                      icon: "⚡",
                      title: "Quick Booking",
                      desc: "Schedule in under 5 minutes"
                    },
                    {
                      icon: "🔒",
                      title: "Secure Payment",
                      desc: "Safe & encrypted transactions"
                    },
                    {
                      icon: "🎯",
                      title: "Best Rate Guarantee",
                      desc: "Lowest price promise"
                    }
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      className="booking-service-card bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center"
                      whileHover={{ y: -5, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <div className="text-3xl mb-3">{feature.icon}</div>
                      <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}