import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
  Filler
} from 'chart.js';
import { Bar, Line, Doughnut, Radar } from 'react-chartjs-2';
import AnimatedButton from '../components/AnimatedButton';
import { getBookings, updateBookingStatus, getBookingStats, clearAllBookings } from '../data/bookingStorage';

gsap.registerPlugin(ScrollTrigger);
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
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const statsRef = useRef(null);
  const chartsRef = useRef(null);
  const featuresRef = useRef(null);
  const activityRef = useRef(null);

  // Scroll transforms for parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const statsScale = useTransform(scrollYProgress, [0.1, 0.3], [1, 1.05]);

  const springHeroY = useSpring(heroY, { stiffness: 400, damping: 40 });

  const [notification, setNotification] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, totalSpent: 0 });

  const updateDashboardData = () => {
    setBookings(getBookings());
    setStats(getBookingStats());
  };

  useEffect(() => {
    // Load initial data
    updateDashboardData();
  }, []);

  useEffect(() => {
    if (!containerRef.current || bookings.length === 0) return;

    const ctx = gsap.context(() => {
      // Hero section animations
      const heroTL = gsap.timeline();
      heroTL.fromTo('.dashboard-header',
        { y: -50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
      )
      .fromTo('.hero-stats-highlight',
        { scale: 0.8, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.6"
      );

      // Stats cards stagger animation
      gsap.fromTo('.stats-card',
        { y: 40, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            toggleActions: "play none none reset"
          }
        }
      );

      // Animate counters with enhanced effect
      gsap.utils.toArray('.counter').forEach((counter, index) => {
        const endValue = parseInt(counter.getAttribute('data-count')) || 0;
        gsap.fromTo(counter,
          { innerText: 0, scale: 0.8 },
          {
            innerText: endValue,
            scale: 1,
            duration: 2.5,
            ease: "power2.out",
            snap: { innerText: 1 },
            delay: index * 0.1 + 0.3,
            onUpdate: function() {
              const current = Math.floor(this.targets()[0].innerText);
              this.targets()[0].innerText = current;
            }
          }
        );
      });

      // Charts section animation
      gsap.fromTo('.chart-container',
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: chartsRef.current,
            start: "top 80%",
            toggleActions: "play none none reset"
          }
        }
      );

      // Features section
      gsap.fromTo('.feature-card',
        { y: 50, opacity: 0, rotateY: -15 },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 85%",
            toggleActions: "play none none reset"
          }
        }
      );

      // Activity section
      gsap.fromTo('.activity-item',
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: activityRef.current,
            start: "top 90%",
            toggleActions: "play none none reset"
          }
        }
      );

      // Floating elements animation
      const floatingElements = gsap.utils.toArray('.floating-bg');
      floatingElements.forEach((element, index) => {
        gsap.to(element, {
          y: -20 + Math.random() * 40,
          x: -10 + Math.random() * 20,
          rotation: Math.random() * 5 - 2.5,
          duration: 4 + Math.random() * 4,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          delay: Math.random() * 2
        });
      });

      // Interactive card hover effects
      const cards = gsap.utils.toArray('.interactive-card');
      cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.02,
            y: -3,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, [bookings]);

  const handleCancelBooking = (bookingId) => {
    gsap.to(`.booking-${bookingId}`, {
      scale: 0.95,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
      onComplete: () => {
        const success = updateBookingStatus(bookingId, 'Cancelled');
        if (success) {
          updateDashboardData();
          setNotification({
            type: 'success',
            message: 'Booking has been cancelled successfully.'
          });
          setTimeout(() => setNotification(null), 4000);
        } else {
          setNotification({
            type: 'error',
            message: 'Failed to cancel booking. Please try again.'
          });
          setTimeout(() => setNotification(null), 4000);
        }
      }
    });
  };

  const handleMarkComplete = (bookingId) => {
    gsap.to(`.booking-${bookingId}`, {
      scale: 1.02,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
      onComplete: () => {
        const success = updateBookingStatus(bookingId, 'Completed');
        if (success) {
          updateDashboardData();
          setNotification({
            type: 'success',
            message: 'Booking marked as completed!'
          });
          setTimeout(() => setNotification(null), 4000);
        } else {
          setNotification({
            type: 'error',
            message: 'Failed to update booking status.'
          });
          setTimeout(() => setNotification(null), 4000);
        }
      }
    });
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
      return dateString;
    }
  };

  const formatTime = (timeString) => {
    try {
      // Convert to 12-hour format if needed
      return timeString;
    } catch {
      return timeString;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Scheduled': return '📅';
      case 'In Progress': return '🔄';
      case 'Completed': return '✅';
      case 'Cancelled': return '❌';
      default: return '📋';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'Cancelled': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const upcomingBookings = bookings.filter(b =>
    b.status === 'Scheduled' &&
    new Date(b.date) >= new Date()
  ).sort((a, b) => new Date(a.date) - new Date(b.date));

  const pastBookings = bookings.filter(b =>
    b.status === 'Completed' || b.status === 'Cancelled' ||
    new Date(b.date) < new Date()
  );

  // Chart data preparation
  const getMonthlyTrends = () => {
    const last6Months = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      last6Months.push(date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }));
    }

    return last6Months.map(label => {
      const monthBookings = bookings.filter(b => {
        const bookingDate = new Date(b.date);
        const monthStart = new Date(label === 'Jan 24' ? bookingDate.getFullYear() : bookingDate.getFullYear(),
          bookingDate.toLocaleDateString('en-US', { month: 'short' }) === label.split(' ')[0] ? bookingDate.getMonth() : -1);
        return monthStart.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }) === label;
      });
      return monthBookings.length;
    });
  };

  const getStatusDistribution = () => {
    const total = bookings.length;
    if (total === 0) return [0, 0, 0, 0];

    return [
      bookings.filter(b => b.status === 'Scheduled').length,
      bookings.filter(b => b.status === 'In Progress').length,
      bookings.filter(b => b.status === 'Completed').length,
      bookings.filter(b => b.status === 'Cancelled').length
    ];
  };

  const getServiceAnalysis = () => {
    const serviceData = {};
    bookings.forEach(booking => {
      serviceData[booking.service] = (serviceData[booking.service] || 0) + 1;
    });
    const sortedServices = Object.entries(serviceData).sort((a, b) => b[1] - a[1]);
    return sortedServices.slice(0, 5);
  };

  const getSpendingTrends = () => {
    const last6Months = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      last6Months.push(date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }));
    }

    return last6Months.map(label => {
      const monthBookings = bookings.filter(b => {
        const bookingDate = new Date(b.date);
        return bookingDate.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }) === label;
      });
      return monthBookings.reduce((sum, b) => sum + (b.price || 0), 0);
    });
  };

  // Chart configurations
  const trendsData = {
    labels: (() => {
      const labels = [];
      const now = new Date();
      for (let i = 5; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        labels.push(date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }));
      }
      return labels;
    })(),
    datasets: [{
      label: 'Bookings per Month',
      data: getMonthlyTrends(),
      borderColor: 'rgb(79, 70, 229)',
      backgroundColor: 'rgba(79, 70, 229, 0.1)',
      borderWidth: 3,
      pointBackgroundColor: 'rgb(79, 70, 229)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(79, 70, 229)',
      fill: true,
      tension: 0.4
    }]
  };

  const statusData = {
    labels: ['Scheduled', 'In Progress', 'Completed', 'Cancelled'],
    datasets: [{
      data: getStatusDistribution(),
      backgroundColor: [
        'rgba(254, 240, 138, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(239, 68, 68, 0.8)'
      ],
      borderColor: [
        'rgb(254, 240, 138)',
        'rgb(59, 130, 246)',
        'rgb(34, 197, 94)',
        'rgb(239, 68, 68)'
      ],
      borderWidth: 2,
      hoverOffset: 8
    }]
  };

  const spendingData = {
    labels: (() => {
      const labels = [];
      const now = new Date();
      for (let i = 5; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        labels.push(date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }));
      }
      return labels;
    })(),
    datasets: [{
      label: 'Monthly Spending (₹)',
      data: getSpendingTrends(),
      backgroundColor: 'rgba(168, 85, 247, 0.6)',
      borderColor: 'rgb(168, 85, 247)',
      borderWidth: 2,
      borderRadius: 4,
      borderSkipped: false,
    }]
  };

  const serviceData = {
    labels: getServiceAnalysis().map(([service]) => service.length > 15 ? service.substring(0, 15) + '...' : service),
    datasets: [{
      label: 'Bookings Count',
      data: getServiceAnalysis().map(([, count]) => count),
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(168, 85, 247, 0.8)'
      ],
      borderColor: [
        'rgb(59, 130, 246)',
        'rgb(16, 185, 129)',
        'rgb(245, 158, 11)',
        'rgb(239, 68, 68)',
        'rgb(168, 85, 247)'
      ],
      borderWidth: 2,
      hoverOffset: 8
    }]
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="floating-bg absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-indigo-200/20 to-blue-200/20 rounded-full blur-3xl"></div>
        <div className="floating-bg absolute top-40 right-20 w-48 h-48 bg-gradient-to-r from-blue-200/15 to-cyan-200/15 rounded-full blur-2xl"></div>
        <div className="floating-bg absolute bottom-32 left-32 w-56 h-56 bg-gradient-to-r from-cyan-200/10 to-indigo-200/10 rounded-full blur-3xl"></div>
        <div className="floating-bg absolute bottom-40 right-10 w-40 h-40 bg-gradient-to-r from-indigo-300/15 to-purple-200/15 rounded-full blur-2xl"></div>
        <div className="floating-bg absolute top-96 right-1/4 w-32 h-32 bg-gradient-to-r from-purple-200/20 to-indigo-200/20 rounded-full blur-xl"></div>
        <div className="floating-bg absolute bottom-96 left-2/3 w-44 h-44 bg-gradient-to-r from-blue-300/15 to-indigo-300/15 rounded-full blur-2xl"></div>
      </div>

      {/* Hero Header */}
      <section
        ref={headerRef}
        className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-slate-50/80 to-indigo-50/60 border-b border-gray-100"
        style={{ y: springHeroY, opacity: heroOpacity }}
      >
        <div className="container mx-auto">
          <div className="text-center max-w-5xl mx-auto">
            <motion.div
              className="dashboard-header inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-2xl mb-8 shadow-xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <span className="text-4xl">📊</span>
            </motion.div>

            <motion.h1
              className="dashboard-header text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-indigo-800 to-blue-800 bg-clip-text text-transparent mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Service Dashboard
            </motion.h1>

            <motion.div
              className="hero-stats-highlight inline-flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-2xl border border-white/20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex items-center gap-6 text-lg">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse"></span>
                  <span className="font-semibold text-gray-900">{stats.total} Total</span>
                </span>
                <span className="w-px h-4 bg-gray-300"></span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="font-semibold text-gray-900">{stats.active} Active</span>
                </span>
                <span className="w-px h-4 bg-gray-300"></span>
                <span className="flex items-center gap-2 font-bold text-indigo-600">
                  ₹{stats.totalSpent.toLocaleString('en-IN')} Spent
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section
        ref={statsRef}
        className="bg-gradient-to-br from-gray-50/50 via-white to-indigo-50/30 py-16 -mt-8"
        style={{ scale: statsScale }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <motion.div
              className="stats-card bg-gradient-to-br from-white to-indigo-50/50 rounded-2xl shadow-xl p-8 border border-indigo-100/50 interactive-card"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center rounded-2xl shadow-lg">
                  <span className="text-2xl">🎫</span>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-indigo-600 counter" data-count={stats.total}>{stats.total}</div>
                  <div className="text-sm text-gray-600 mt-1 font-medium">Total Bookings</div>
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-6 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                {(() => {
                  const thisMonth = bookings.filter(b => {
                    const bookingDate = new Date(b.date);
                    const now = new Date();
                    return bookingDate.getMonth() === now.getMonth() &&
                           bookingDate.getFullYear() === now.getFullYear();
                  }).length;
                  return `${thisMonth} this month`;
                })()}
              </div>
            </motion.div>

            <motion.div
              className="stats-card bg-gradient-to-br from-white to-green-50/50 rounded-2xl shadow-xl p-8 border border-green-100/50 interactive-card"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center rounded-2xl shadow-lg">
                  <span className="text-2xl">🔄</span>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600 counter" data-count={stats.active}>{stats.active}</div>
                  <div className="text-sm text-gray-600 mt-1 font-medium">Active Services</div>
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-6 flex items-center gap-1">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                {(() => {
                  const scheduled = bookings.filter(b => b.status === 'Scheduled').length;
                  const inProgress = bookings.filter(b => b.status === 'In Progress').length;
                  return `${scheduled} scheduled • ${inProgress} in progress`;
                })()}
              </div>
            </motion.div>

            <motion.div
              className="stats-card bg-gradient-to-br from-white to-purple-50/50 rounded-2xl shadow-xl p-8 border border-purple-100/50 interactive-card"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center rounded-2xl shadow-lg">
                  <span className="text-2xl">💰</span>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-purple-600">
                    ₹<span className="counter" data-count={stats.totalSpent}>
                      {stats.totalSpent.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1 font-medium">Total Spent</div>
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-6 flex items-center gap-1">
                <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                Avg ₹{stats.total > 0 ? Math.round(stats.totalSpent / stats.total).toLocaleString('en-IN') : 0} per service
              </div>
            </motion.div>

            <motion.div
              className="stats-card bg-gradient-to-br from-white to-yellow-50/50 rounded-2xl shadow-xl p-8 border border-yellow-100/50 interactive-card"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center rounded-2xl shadow-lg">
                  <span className="text-2xl">🎯</span>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-yellow-600 counter" data-count={(() => {
                    const completed = bookings.filter(b => b.status === 'Completed').length;
                    const total = bookings.length;
                    return total > 0 ? Math.round((completed / total) * 100) : 0;
                  })()}>
                    {(() => {
                      const completed = bookings.filter(b => b.status === 'Completed').length;
                      const total = bookings.length;
                      return total > 0 ? Math.round((completed / total) * 100) : 0;
                    })()}%
                  </div>
                  <div className="text-sm text-gray-600 mt-1 font-medium">Completion Rate</div>
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-6 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                {(() => {
                  const completed = bookings.filter(b => b.status === 'Completed').length;
                  const cancelled = bookings.filter(b => b.status === 'Cancelled').length;
                  return `${completed} completed • ${cancelled} cancelled`;
                })()}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Charts & Analytics */}
      <section
        ref={chartsRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30"
      >
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Analytics & Insights
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Visualize your service booking patterns and spending trends with detailed analytics
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Monthly Trends */}
            <motion.div
              className="chart-container bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                Booking Trends
              </h3>
              <div className="h-64">
                <Line
                  data={trendsData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                      tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff'
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(0, 0, 0, 0.05)' },
                        ticks: { precision: 0 }
                      },
                      x: {
                        grid: { color: 'rgba(0, 0, 0, 0.05)' }
                      }
                    },
                    elements: {
                      point: {
                        radius: 6,
                        hoverRadius: 8
                      }
                    }
                  }}
                />
              </div>
            </motion.div>

            {/* Status Distribution */}
            <motion.div
              className="chart-container bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                Status Distribution
              </h3>
              <div className="h-64 flex items-center justify-center">
                <Doughnut
                  data={statusData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: { padding: 20, usePointStyle: true }
                      },
                      tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff'
                      }
                    }
                  }}
                />
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Spending Trends */}
            <motion.div
              className="chart-container bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                Monthly Spending (₹)
              </h3>
              <div className="h-64">
                <Bar
                  data={spendingData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                      tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        callbacks: {
                          label: (context) => `₹${context.raw.toLocaleString('en-IN')}`
                        }
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(0, 0, 0, 0.05)' },
                        ticks: {
                          callback: (value) => `₹${value.toLocaleString('en-IN')}`
                        }
                      },
                      x: {
                        grid: { color: 'rgba(0, 0, 0, 0.05)' }
                      }
                    }
                  }}
                />
              </div>
            </motion.div>

            {/* Popular Services */}
            <motion.div
              className="chart-container bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                Popular Services
              </h3>
              <div className="h-64 flex items-center justify-center">
                <Doughnut
                  data={serviceData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right',
                        labels: {
                          padding: 15,
                          usePointStyle: true,
                          font: { size: 12 }
                        }
                      },
                      tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff'
                      }
                    }
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dashboard Features */}
      <section
        ref={featuresRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-pink-50/30"
      >
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Smart Insights & Actions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Intelligent recommendations based on your booking patterns and preferences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Most Used Service */}
            <motion.div
              className="feature-card bg-gradient-to-br from-white to-indigo-50/30 rounded-2xl shadow-xl p-8 border border-indigo-100/50 interactive-card"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center rounded-2xl shadow-lg">
                  <span className="text-2xl">⭐</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Most Used Service</h3>
                  <p className="text-sm text-gray-600">Your favorite choice</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-indigo-600 mb-4">
                {(() => {
                  const serviceCounts = {};
                  bookings.forEach(b => {
                    if (b.service) {
                      serviceCounts[b.service] = (serviceCounts[b.service] || 0) + 1;
                    }
                  });
                  const sortedServices = Object.entries(serviceCounts).sort(([,a], [,b]) => b - a);
                  return sortedServices.length > 0 ? sortedServices[0][0] : 'No Data';
                })()}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
                Based on your booking history
              </div>
            </motion.div>

            {/* Monthly Average */}
            <motion.div
              className="feature-card bg-gradient-to-br from-white to-green-50/30 rounded-2xl shadow-xl p-8 border border-green-100/50 interactive-card"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center rounded-2xl shadow-lg">
                  <span className="text-2xl">💰</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Monthly Average</h3>
                  <p className="text-sm text-gray-600">Your spending trend</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-green-600 mb-4">
                ₹{(() => {
                  const thisYearBookings = bookings.filter(b => {
                    const bookingDate = new Date(b.date);
                    return bookingDate.getFullYear() === new Date().getFullYear();
                  });
                  const totalSpent = thisYearBookings.reduce((sum, b) => sum + b.price, 0);
                  const months = Math.max(1, new Date().getMonth() + 1);
                  return Math.round(totalSpent / months);
                })()}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                This year's average
              </div>
            </motion.div>

            {/* Completion Rate Insight */}
            <motion.div
              className="feature-card bg-gradient-to-br from-white to-yellow-50/30 rounded-2xl shadow-xl p-8 border border-yellow-100/50 interactive-card"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center rounded-2xl shadow-lg">
                  <span className="text-2xl">🎯</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Success Rate</h3>
                  <p className="text-sm text-gray-600">Completion performance</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-yellow-600 mb-4">
                {(() => {
                  const totalBookings = bookings.length;
                  if (totalBookings === 0) return 0;
                  const completedBookings = bookings.filter(b => b.status === 'Completed').length;
                  return Math.round((completedBookings / totalBookings) * 100);
                })()}%
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                Services completed successfully
              </div>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold hover:from-indigo-700 hover:to-blue-700 shadow-xl hover:shadow-2xl"
                onClick={() => navigate('/services')}
                ariaLabel="Book a new service"
              >
                Book New Service
              </AnimatedButton>

              <AnimatedButton
                className="px-8 py-4 bg-white text-gray-900 font-semibold border-2 border-gray-200 hover:border-indigo-300 shadow-xl hover:shadow-2xl"
                onClick={() => navigate('/contact')}
                ariaLabel="Contact support"
              >
                Get Support
              </AnimatedButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recent Activity & History */}
      <section
        ref={activityRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Recent Activity
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Track your latest bookings and service history with real-time updates
            </p>
          </motion.div>

          {/* Upcoming Bookings */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-white to-indigo-50/30 rounded-2xl shadow-xl p-8 border border-indigo-100/50">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center rounded-2xl shadow-lg">
                  <span className="text-2xl">📅</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">Upcoming Appointments</h2>
                  <p className="text-gray-600">Your scheduled services at a glance</p>
                </div>
              </div>

              {upcomingBookings.length === 0 ? (
                <motion.div
                  className="text-center py-16"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center rounded-2xl mx-auto mb-6 shadow-lg">
                    <span className="text-4xl">🎯</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">No upcoming bookings</h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">Book your next home service to stay on track!</p>
                  <AnimatedButton
                    onClick={() => navigate('/services')}
                    className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold hover:from-indigo-700 hover:to-blue-700 shadow-xl hover:shadow-2xl"
                  >
                    Schedule a Service
                  </AnimatedButton>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {upcomingBookings.slice(0, 4).map((booking, index) => (
                    <motion.div
                      key={booking.id}
                      className={`activity-item booking-${booking.id} bg-gradient-to-br from-white to-gray-50/50 rounded-xl p-6 border border-gray-200 shadow-lg interactive-card`}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -3, scale: 1.01 }}
                      onHoverStart={() => gsap.to(`.booking-${booking.id}`, { scale: 1.02, duration: 0.2 })}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center rounded-xl shadow-lg">
                            <span className="text-lg">🔧</span>
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 mb-1">{booking.service}</h3>
                            <div className={`inline-flex items-center px-2 py-1 text-xs border rounded-full ${getStatusColor(booking.status)}`}>
                              <span className="mr-1">{getStatusIcon(booking.status)}</span>
                              {booking.status}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-indigo-600">₹{booking.price}</div>
                          <div className="text-xs text-gray-500">Service Fee</div>
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-indigo-500">📅</span>
                          <span className="text-gray-700 font-medium">{formatDate(booking.date)} at {booking.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-green-500">👨‍🔧</span>
                          <span className="text-gray-700">{booking.provider}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-purple-500">📍</span>
                          <span className="text-gray-700 truncate">{booking.address}</span>
                        </div>
                      </div>

                      {booking.status === 'Scheduled' && (
                        <motion.button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="w-full bg-white border border-gray-300 text-gray-700 px-4 py-2 text-sm font-medium hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-colors rounded-lg shadow-sm"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Cancel Booking
                        </motion.button>
                      )}
                    </motion.div>
                  ))}

                  {upcomingBookings.length > 4 && (
                    <motion.div
                      className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-dashed border-indigo-300 rounded-xl p-6 flex items-center justify-center shadow-lg"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <div className="text-center">
                        <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center rounded-xl mx-auto mb-3 shadow-lg">
                          <span className="text-xl">📅</span>
                        </div>
                        <p className="text-indigo-600 font-bold text-lg">+{upcomingBookings.length - 4} more upcoming</p>
                        <p className="text-gray-500 text-sm">View all your bookings</p>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </motion.div>

          {/* Booking History */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 px-8 py-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center rounded-2xl shadow-lg">
                    <span className="text-2xl">📚</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Booking History</h2>
                    <p className="text-gray-600">Track your past services and records</p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                {pastBookings.length === 0 ? (
                  <motion.div
                    className="text-center py-16"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center rounded-2xl mx-auto mb-6 shadow-lg">
                      <span className="text-3xl">📈</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No past bookings yet</h3>
                    <p className="text-gray-600">Your completed services will appear here.</p>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {pastBookings.slice(0, 5).map((booking, index) => (
                      <motion.div
                        key={booking.id}
                        className="activity-item bg-gradient-to-br from-white to-gray-50/50 rounded-xl p-6 border border-gray-200 shadow-lg interactive-card"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -2, scale: 1.01 }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center rounded-xl shadow-lg">
                              <span className="text-lg">🔧</span>
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900 mb-1">{booking.service}</h3>
                              <div className={`inline-flex items-center px-2 py-1 text-xs border rounded-full ${getStatusColor(booking.status)}`}>
                                <span className="mr-1">{getStatusIcon(booking.status)}</span>
                                {booking.status}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-gray-900">₹{booking.price}</div>
                            <div className="text-xs text-gray-500 mt-1">Service Fee</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <span className="text-indigo-500">📅</span>
                            <span className="font-medium">{formatDate(booking.date)} at {booking.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <span className="text-green-500">👨‍🔧</span>
                            <span>{booking.provider}</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          {booking.status === 'Cancelled' ? (
                            <span className="text-xs text-red-600 font-medium bg-red-50 px-3 py-1 rounded-full flex items-center gap-1">
                              <span>❌</span> Booking Cancelled
                            </span>
                          ) : booking.status === 'In Progress' ? (
                            <motion.button
                              onClick={() => handleMarkComplete(booking.id)}
                              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-2 text-sm font-medium transition-all rounded-lg shadow-lg"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Mark Complete
                            </motion.button>
                          ) : booking.status === 'Scheduled' ? (
                            <motion.button
                              onClick={() => handleCancelBooking(booking.id)}
                              className="bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2 text-sm font-medium border border-red-200 hover:border-red-300 transition-colors rounded-lg"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Cancel Booking
                            </motion.button>
                          ) : (
                            <span className="text-xs text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full flex items-center gap-1">
                              <span>✅</span> {booking.status}
                            </span>
                          )}

                          {/* Admin: Clear all bookings button (in development) */}
                          {booking.id && bookings.length > 0 && index === 0 && (
                            <motion.button
                              onClick={() => {
                                if (window.confirm('Clear ALL booking data? This action cannot be undone.')) {
                                  clearAllBookings();
                                  updateDashboardData();
                                }
                              }}
                              className="text-xs text-gray-400 hover:text-red-600 underline opacity-30 hover:opacity-100 transition-all"
                              title="Clear all bookings (dev mode)"
                              initial={{ opacity: 0.3 }}
                              whileHover={{ opacity: 1 }}
                            >
                              Clear All
                            </motion.button>
                          )}
                        </div>
                      </motion.div>
                    ))}

                    {pastBookings.length > 5 && (
                      <motion.div
                        className="text-center pt-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <p className="text-gray-500 mb-4">Showing 5 of {pastBookings.length} past bookings</p>
                        <AnimatedButton
                          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold hover:from-indigo-700 hover:to-blue-700 shadow-xl hover:shadow-2xl"
                        >
                          View All History
                        </AnimatedButton>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}