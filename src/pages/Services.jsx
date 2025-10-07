import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ServiceCard from "../components/ServiceCard";
import AnimatedButton from "../components/AnimatedButton";
import LoadingPlaceholder from "../components/LoadingPlaceholder";
import servicesMock from "../data/servicesMock";
import AnimatedBackground from "../components/AnimatedBackground";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);

  // Mouse tracking for GSAP animations
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mouseX.set(x);
        mouseY.set(y);

        // GSAP mouse tracking for service cards
        gsap.to(".service-card", {
          rotationY: (x / rect.width - 0.5) * 10,
          rotationX: (y / rect.height - 0.5) * -10,
          duration: 0.3,
          ease: "power2.out",
          stagger: { amount: 0.1 }
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Simulate API loading with GSAP
    const timer = setTimeout(() => {
      setServices(servicesMock);

      // Animate in services with GSAP
      gsap.set(".service-card", { y: 100, opacity: 0, scale: 0.8 });
      gsap.to(".service-card", {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        onComplete: () => setLoading(false)
      });

      // Set up ScrollTrigger for parallax
      gsap.utils.toArray('.service-card').forEach((element, index) => {
        gsap.to(element, {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

    }, 1200);

    // Create floating background elements
    const floatingElements = Array.from({ length: 5 }, (_, i) => ({
      id: `float-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 20 + Math.random() * 40,
      duration: 4 + Math.random() * 4
    }));

    floatingElements.forEach((element, i) => {
      gsap.set(`#float-${i}`, { x: element.x + '%', y: element.y + '%' });
      gsap.to(`#float-${i}`, {
        x: (element.x + Math.random() * 20 - 10) + '%',
        y: (element.y + Math.random() * 20 - 10) + '%',
        duration: element.duration,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: i * 0.5
      });
    });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [mouseX, mouseY]);

  // Extract unique categories
  const categories = ["all", ...new Set(servicesMock.map(s => s.category || "General"))];

  const filteredServices = services.filter(service => {
    const matchesQuery = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        service.short.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || (service.category || "General") === selectedCategory;

    return matchesQuery && matchesCategory;
  });

  // Sort services
  const sortedServices = [...filteredServices].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.title.localeCompare(b.title);
      case "featured":
        return b.featured ? 1 : -1;
      default:
        return 0; // Keep original order for 'popular'
    }
  });

  const handleSortChange = (newSort) => {
    setSortBy(newSort);

    // Animate sort change
    gsap.fromTo(".service-card",
      { scale: 1.1, y: -20 },
      {
        scale: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out"
      }
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("popular");

    // Animate filter reset
    gsap.fromTo(".service-card",
      { scale: 0.9, opacity: 0.5 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      }
    );
  };

  // Create gradient backgrounds for each service card
  const getCardStyle = (service, index) => ({
    background: `linear-gradient(135deg, ${service.gradient.startsWith('from-') ? `var(--tw-gradient-to), var(--tw-gradient-from)` : '#f3f4f6'} 0%, transparent 100%)`
  });

  return (
    <AnimatedBackground variant="particles" intensity="low" className="min-h-screen">
      <div ref={containerRef} className="relative">
        {/* Hero Section */}
        <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
          {/* Dynamic Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20" />

          {/* Floating Orbs */}
          {Array.from({ length: 8 }, (_, i) => (
            <motion.div
              key={i}
              id={`float-${i}`}
              className="absolute rounded-full bg-gradient-to-r from-blue-400/20 to-purple-500/20 blur-xl"
              style={{
                width: 100 + Math.random() * 200,
                height: 100 + Math.random() * 200,
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%'
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2
              }}
            />
          ))}

          <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Our Services
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Discover our comprehensive range of premium home services. From essential repairs to complete renovations,
              we connect you with expert professionals for every need.
            </motion.p>
          </div>
        </section>

        {/* Filters & Search */}
        <section className="sticky top-0 z-30 backdrop-blur-xl bg-white/80 border-b border-gray-200/20 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">

              {/* Search & Filters */}
              <div className="flex flex-col sm:flex-row gap-4 items-center w-full lg:w-auto">

                {/* Search Input */}
                <div className="relative flex-1 lg:w-96">
                  <motion.input
                    type="text"
                    placeholder="Search services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-6 py-3 pl-12 rounded-2xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 outline-none"
                    whileFocus={{ scale: 1.02 }}
                  />
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                {/* Category Filter */}
                <div className="relative">
                  <motion.button
                    onClick={() => setShowFilters(!showFilters)}
                    className="px-6 py-3 rounded-xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm hover:border-blue-500 transition-all duration-300 flex items-center gap-2"
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{selectedCategory === "all" ? "All Categories" : selectedCategory}</span>
                    <motion.svg
                      className="w-4 h-4"
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      animate={{ rotate: showFilters ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </motion.button>

                  <AnimatePresence>
                    {showFilters && (
                      <motion.div
                        className="absolute top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        {categories.map((category) => (
                          <motion.button
                            key={category}
                            onClick={() => {
                              setSelectedCategory(category);
                              setShowFilters(false);
                            }}
                            className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors ${
                              selectedCategory === category ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                            }`}
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span className="capitalize">{category}</span>
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Clear Filters */}
                {(searchQuery || selectedCategory !== "all") && (
                  <motion.button
                    onClick={clearFilters}
                    className="px-4 py-2 text-sm text-red-600 hover:text-red-700 transition-colors border border-red-200 rounded-lg hover:bg-red-50"
                    whileTap={{ scale: 0.95 }}
                  >
                    Clear
                  </motion.button>
                )}
              </div>

              {/* Sort & View Controls */}
              <div className="flex gap-3 items-center">

                {/* Sort Options */}
                <div className="flex gap-2">
                  {[
                    { value: "popular", label: "Popular" },
                    { value: "price-low", label: "Price ↓" },
                    { value: "price-high", label: "Price ↑" },
                    { value: "name", label: "Name" },
                    { value: "featured", label: "Featured" }
                  ].map((option) => (
                    <motion.button
                      key={option.value}
                      onClick={() => handleSortChange(option.value)}
                      className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                        sortBy === option.value
                          ? 'bg-blue-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      {option.label}
                    </motion.button>
                  ))}
                </div>

                {/* View Mode Toggle */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  {[
                    { mode: "grid", icon: "⊞" },
                    { mode: "list", icon: "☰" }
                  ].map((view) => (
                    <motion.button
                      key={view.mode}
                      onClick={() => setViewMode(view.mode)}
                      className={`px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                        viewMode === view.mode
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-600'
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      {view.icon}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Summary */}
            <motion.div
              className="mt-4 text-sm text-gray-600 border-t border-gray-100 pt-3"
              layout
            >
              <span className="font-medium">{sortedServices.length}</span> services found
              {selectedCategory !== "all" && ` in ${selectedCategory}`}
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section ref={gridRef} className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">

            {loading ? (
              <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`}>
                {Array.from({ length: 9 }, (_, i) => (
                  <LoadingPlaceholder key={i} />
                ))}
              </div>
            ) : (
              <motion.div
                layout
                className={`${
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    : "space-y-6"
                }`}
              >
                <AnimatePresence mode="popLayout">
                  {sortedServices.length > 0 ? (
                    sortedServices.map((service, index) => (
                      <motion.div
                        key={`${service.id}-${sortBy}`}
                        className="service-card"
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{
                          y: -10,
                          transition: { type: "spring", stiffness: 300, damping: 30 }
                        }}
                      >
                        <ServiceCard
                          service={service}
                          index={index}
                          variant={viewMode === "grid" ? "default" : "minimal"}
                        />
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      className="col-span-full text-center py-16"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="text-6xl mb-4">🔍</div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">No services found</h3>
                      <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
                      <AnimatedButton onClick={clearFilters}>
                        Clear All Filters
                      </AnimatedButton>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Can't Find What You're Looking For?
              </h2>
              <p className="text-lg mb-8 text-white/90">
                We're constantly adding new services. Contact us to request specific services or get a quote for custom work.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <AnimatedButton
                  className="bg-white text-blue-600 hover:bg-blue-50 border-2 border-white"
                  onClick={() => window.location.href = '/contact'}
                >
                  Contact Us
                </AnimatedButton>
                <AnimatedButton
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10"
                  onClick={() => window.location.href = '/dashboard'}
                >
                  View My Bookings
                </AnimatedButton>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </AnimatedBackground>
  );
}