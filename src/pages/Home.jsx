import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import AnimatedButton from '../components/AnimatedButton';
import ServiceCard from '../components/ServiceCard';
import services from '../data/servicesMock';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const navigate = useNavigate();
  const heroRef = useRef();
  const featuresRef = useRef();
  const statsRef = useRef();
  const testimonialsRef = useRef();

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const springScale = useSpring(scale, { stiffness: 400, damping: 40 });
  const springOpacity = useSpring(opacity, { stiffness: 300, damping: 40 });

  useEffect(() => {
    // Hero animations
    const heroTL = gsap.timeline();

    heroTL.fromTo(
      ".hero-title",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
    .fromTo(
      ".hero-subtitle",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.7"
    )
    .fromTo(
      ".hero-buttons",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.5"
    )
    .fromTo(
      ".hero-gradient",
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" },
      "-=0.8"
    );

    // Features animations
    const features = gsap.utils.toArray('.feature-card');
    features.forEach((feature, i) => {
      gsap.fromTo(
        feature,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: feature,
            start: "top 80%",
            toggleActions: "play none none reset"
          }
        }
      );
    });

    // Stats animation
    const statsTL = gsap.timeline({
      scrollTrigger: {
        trigger: statsRef.current,
        start: "top 80%",
        toggleActions: "play none none reset"
      }
    });

    const counterUp = (element, endValue, duration = 2) => {
      let startValue = 0;
      const increment = endValue / (duration * 60);

      const counter = () => {
        startValue += increment;
        if (startValue < endValue) {
          element.textContent = Math.floor(startValue);
          requestAnimationFrame(counter);
        } else {
          element.textContent = endValue;
        }
      };

      counter();
    };

    statsTL.fromTo(
      ".stats-card",
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1,
        onComplete: () => {
          // Animate counters
          const counters = document.querySelectorAll('.counter');
          counters.forEach(counter => {
            const endValue = parseInt(counter.getAttribute('data-count'));
            counterUp(counter, endValue);
          });
        }
      }
    );

    // Testimonials animation
    gsap.fromTo(
      ".testimonial-card",
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: "top 80%",
          toggleActions: "play none none reset"
        }
      }
    );

    // Floating background elements
    const floatingElements = gsap.utils.toArray('.floating');
    floatingElements.forEach((element, i) => {
      gsap.to(element, {
        y: -20 + Math.random() * 40,
        x: -10 + Math.random() * 20,
        rotation: Math.random() * 10 - 5,
        duration: 3 + Math.random() * 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        delay: Math.random() * 2
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  };

  const navigateToServices = () => {
    navigate('/services');
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden"
      >
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-indigo-200 to-blue-200 rounded-full opacity-20 blur-xl"></div>
          <div className="floating absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full opacity-20 blur-xl"></div>
          <div className="floating absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full opacity-20 blur-xl"></div>
          <div className="floating absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full opacity-20 blur-xl"></div>
        </div>

        <motion.div
          className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
          style={{ scale: springScale, opacity: springOpacity }}
        >
          <div className="hero-gradient absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-3xl blur-3xl scale-110"></div>

          <div className="relative z-20">
            <motion.h1
              className="hero-title text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Professional Home Services
              <span className="block bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                At Your Doorstep
              </span>
            </motion.h1>

            <p className="hero-subtitle text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect with certified professionals for all your home service needs.
              From plumbing to electrical repairs, we've got you covered with trusted experts in your area.
            </p>

            <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center items-center">
              <AnimatedButton
                className="px-8 py-4 text-lg shadow-xl bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-2xl transition-all duration-300"
                onClick={navigateToServices}
                ariaLabel="Browse our services"
              >
                Get Started
              </AnimatedButton>

              <AnimatedButton
                className="px-8 py-4 text-lg shadow-xl bg-white text-gray-900 hover:bg-gray-50 border-2 border-gray-200 hover:border-indigo-300 hover:shadow-2xl transition-all duration-300"
                onClick={() => scrollToSection('features')}
                ariaLabel="Learn more about our services"
              >
                Learn More
              </AnimatedButton>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        ref={featuresRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Choose Us?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We connect you with experienced, certified professionals for all your home service needs.
              Get quality work done on time, every time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "✅",
                title: "Verified Professionals",
                description: "All our service providers are background checked, licensed, and insured."
              },
              {
                icon: "⏰",
                title: "Flexible Scheduling",
                description: "Book services at your convenience with 24/7 scheduling options."
              },
              {
                icon: "🔧",
                title: "Quality Guarantee",
                description: "We're committed to quality work with satisfaction guarantee on all services."
              },
              {
                icon: "💰",
                title: "Transparent Pricing",
                description: "Clear upfront pricing with no hidden fees or surprise charges."
              },
              {
                icon: "🚀",
                title: "Fast & Reliable",
                description: "Get services scheduled quickly with our professional network."
              },
              {
                icon: "🛡️",
                title: "Safe & Trusted",
                description: "Your safety and security are our top priorities in every interaction."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Popular Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our most popular home services. Professional help for every aspect of your home maintenance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {services.slice(0, 3).map((service) => (
              <motion.div
                key={service.id}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <AnimatedButton
              className="px-8 py-4 text-lg shadow-xl bg-orange-500 text-white hover:bg-orange-600 hover:shadow-2xl transition-all duration-300"
              onClick={navigateToServices}
              ariaLabel="View all services"
            >
              View All Services
            </AnimatedButton>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={statsRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-blue-600"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { count: '50K+', label: 'Services Completed' },
              { count: '15K+', label: 'Happy Customers' },
              { count: '850+', label: 'Verified Professionals' },
              { count: '99%', label: 'Satisfaction Rate' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="stats-card text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div
                  className="counter text-3xl md:text-4xl font-bold text-white mb-2"
                  data-count={stat.count.replace(/[^\d]/g, '')}
                >
                  0
                </div>
                <div className="text-white/90 text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        ref={testimonialsRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what real customers have to say about our services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "Excellent service! Our plumber arrived on time and fixed our leaky faucet in no time. Highly recommended!",
                author: "Sarah Johnson",
                location: "Downtown",
                rating: 5
              },
              {
                quote: "Very professional team. The electrical work was done perfectly and within budget. Will definitely use again.",
                author: "Mike Chen",
                location: "Riverside",
                rating: 5
              },
              {
                quote: "Outstanding customer service. The cleaning crew was thorough, respectful, and made our home sparkle!",
                author: "Elena Rodriguez",
                location: "Oak Hills",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="testimonial-card bg-white rounded-xl p-6 shadow-lg"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-4 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-600">{testimonial.location}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Your Home Services Done?
            </h2>
            <p className="text-lg mb-8 text-gray-300">
              Join thousands of satisfied customers who trust us with their home maintenance needs.
              Professional, reliable, and hassle-free.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton
                className="px-8 py-4 text-lg shadow-xl bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-2xl transition-all duration-300"
                onClick={navigateToServices}
                ariaLabel="Start booking services"
              >
                Book Now
              </AnimatedButton>

              <AnimatedButton
                className="px-8 py-4 text-lg shadow-xl bg-white text-gray-900 hover:bg-gray-50 border-2 border-gray-200 hover:border-indigo-300 hover:shadow-2xl transition-all duration-300"
                onClick={() => navigate('/contact')}
                ariaLabel="Contact us for more information"
              >
                Contact Us
              </AnimatedButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}