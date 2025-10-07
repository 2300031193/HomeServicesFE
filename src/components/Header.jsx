import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, useScroll, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

export default function Header() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const searchRef = useRef(null);

  // Scroll-based background blur and opacity
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.98]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.05], [0.95, 0.85]);

  // Magnetic effect for logo
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const logoX = useSpring(mouseX, { stiffness: 100, damping: 25 });
  const logoY = useSpring(mouseY, { stiffness: 100, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!logoRef.current) return;

      const logoRect = logoRef.current.getBoundingClientRect();
      const logoCenterX = logoRect.left + logoRect.width / 2;
      const logoCenterY = logoRect.top + logoRect.height / 2;

      const deltaX = (e.clientX - logoCenterX) * 0.1;
      const deltaY = (e.clientY - logoCenterY) * 0.1;

      mouseX.set(deltaX);
      mouseY.set(deltaY);
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mouseX, mouseY]);

  const toggleMobileMenu = () => {
    setMobileMenu((prev) => {
      if (!prev) {
        // Animate in
        gsap.set(".mobile-menu", { y: -20, opacity: 0 });
        gsap.to(".mobile-menu", { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
        // Hide body scroll
        document.body.style.overflow = 'hidden';
      } else {
        // Animate out
        gsap.to(".mobile-menu", { y: -20, opacity: 0, duration: 0.3, ease: "power1.in" });
        // Restore body scroll
        setTimeout(() => {
          document.body.style.overflow = 'auto';
        }, 300);
      }
      return !prev;
    });
  };

  const scrollToServices = () => {
    if (location.pathname === '/') {
      const servicesSection = document.getElementById('features');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const servicesSection = document.getElementById('features');
        if (servicesSection) {
          servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleLogoClick = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    // Mock search suggestions
    if (value.length > 1) {
      setSearchResults([
        "Plumbing",
        "Electrical",
        "HVAC",
        "House Cleaning",
        "Appliance Repair"
      ].filter(item => item.toLowerCase().includes(value.toLowerCase())));
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/services?q=${searchQuery}`);
    setSearchExpanded(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const navItems = [
    {
      to: "/",
      label: "Home",
      action: () => navigate("/"),
      icon: "🏠"
    },
    {
      to: "/services",
      label: "Services",
      action: scrollToServices,
      icon: "🔧"
    },
    {
      to: "/about",
      label: "About",
      icon: "ℹ️"
    },
    {
      to: "/contact",
      label: "Contact",
      icon: "📞"
    }
  ];

  return (
    <motion.header
      ref={headerRef}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-2xl'
          : 'backdrop-blur-sm bg-white/60 border-b border-white/20 shadow-lg'
      }`}
      style={{ scale, y, opacity }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">

          {/* Logo - Magnetic Effect */}
          <motion.div
            ref={logoRef}
            className="flex items-center cursor-pointer group relative"
            whileHover={{ scale: 1.02 }}
            onClick={handleLogoClick}
            style={{
              x: logoX,
              y: logoY
            }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Main logo */}
            <motion.div
              className="relative w-12 h-12 bg-gradient-to-br from-orange-500 via-pink-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden"
              whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated inner glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent rounded-xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />

              <motion.span
                className="relative text-white font-bold text-xl z-10"
                animate={{
                  textShadow: [
                    "0 0 5px rgba(255,255,255,0.3)",
                    "0 0 15px rgba(255,255,255,0.8)",
                    "0 0 5px rgba(255,255,255,0.3)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                HS
              </motion.span>
            </motion.div>

            <div className="ml-4 relative">
              <motion.h1
                className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-900 via-orange-600 to-pink-600 bg-clip-text text-transparent group-hover:from-orange-600 group-hover:to-pink-600 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                HomeServices
              </motion.h1>
              <motion.p
                className="text-sm text-gray-600 group-hover:text-orange-500 transition-colors duration-200"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
              >
                Professional • Reliable • Trusted
              </motion.p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  onClick={item.action || (() => navigate(item.to))}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${
                    location.pathname === item.to
                      ? 'text-orange-600 bg-orange-50/80 shadow-sm'
                      : 'text-gray-600 hover:text-orange-600 hover:bg-white/80'
                  }`}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: location.pathname === item.to ? 'rgba(251, 146, 60, 0.1)' : 'rgba(255, 255, 255, 0.8)'
                  }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Hover background effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                    style={{ scale }}
                  />

                  {/* Icon animation */}
                  <div className="flex items-center gap-2 relative z-10">
                    <motion.span
                      className="text-lg group-hover:scale-110"
                      initial={{ rotate: 0 }}
                      whileHover={{ rotate: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.icon}
                    </motion.span>
                    <span>{item.label}</span>
                  </div>

                  {/* Active indicator */}
                  {location.pathname === item.to && (
                    <motion.div
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full"
                      layoutId="activeNav"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Enhanced Search */}
            <div className="relative">
              <motion.button
                onClick={() => setSearchExpanded(!searchExpanded)}
                className={`relative p-2 rounded-xl transition-all duration-300 group overflow-hidden ${
                  searchExpanded
                    ? 'text-orange-600 bg-orange-50/80 shadow-lg'
                    : 'text-gray-600 hover:text-orange-600 hover:bg-white/80'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Button glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  searchExpanded ? 'opacity-100' : ''
                }`} />

                <motion.svg
                  className="w-5 h-5 relative z-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={searchExpanded ? { scale: 0.9 } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </motion.svg>
              </motion.button>

              {/* Search overlay */}
              <AnimatePresence>
                {searchExpanded && (
                  <>
                    {/* Backdrop */}
                    <motion.div
                      className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setSearchExpanded(false)}
                    />

                    {/* Search panel */}
                    <motion.div
                      className="absolute top-full right-0 mt-2 w-96 max-w-sm bg-white rounded-2xl shadow-2xl border border-white/50 backdrop-blur-xl z-50 overflow-hidden"
                      initial={{ opacity: 0, y: -20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <form onSubmit={handleSearchSubmit} className="p-4">
                        <div className="relative">
                          <input
                            ref={searchRef}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            placeholder="Search for services..."
                            className="w-full px-4 py-3 pl-12 text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setTimeout(() => setIsSearchFocused(false), 150)}
                          />
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          </div>
                          {searchQuery && (
                            <motion.button
                              type="button"
                              onClick={() => {
                                setSearchQuery("");
                                setSearchResults([]);
                              }}
                              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </motion.button>
                          )}
                        </div>

                        {/* Search results */}
                        <AnimatePresence>
                          {searchResults.length > 0 && (
                            <motion.div
                              className="mt-2 space-y-1 max-h-48 overflow-y-auto"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                            >
                              {searchResults.map((result, index) => (
                                <motion.button
                                  key={result}
                                  type="button"
                                  onClick={() => {
                                    navigate(`/services?q=${result}`);
                                    setSearchExpanded(false);
                                    setSearchQuery("");
                                    setSearchResults([]);
                                  }}
                                  className="w-full px-3 py-2 text-left hover:bg-orange-50 rounded-lg text-gray-700 hover:text-orange-600 transition-colors duration-150"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                >
                                  <div className="flex items-center gap-3">
                                    <span className="text-lg">🔍</span>
                                    <span className="text-sm">{result}</span>
                                  </div>
                                </motion.button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </form>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* User Actions */}
            <div className="hidden md:flex items-center space-x-3">
              <Link to="/login">
                <motion.button
                  className="relative px-4 py-2 text-gray-700 hover:text-orange-600 transition-colors font-medium group overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10">Sign In</span>
                </motion.button>
              </Link>

              <Link to="/dashboard">
                <motion.button
                  className="relative px-6 py-2 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10">Dashboard</span>
                </motion.button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <motion.button
              onClick={toggleMobileMenu}
              className={`lg:hidden relative p-2 rounded-xl transition-all duration-300 group overflow-hidden ${
                mobileMenu
                  ? 'text-orange-600 bg-orange-50/80 shadow-lg'
                  : 'text-gray-600 hover:text-orange-600 hover:bg-white/80'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <motion.svg
                className="relative w-6 h-6 z-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={mobileMenu ? "open" : "closed"}
              >
                <motion.path
                  variants={{
                    closed: { d: "M4 6h16M4 12h16M4 18h16" },
                    open: [
                      { d: "M4 18h16" },
                      { d: "M4 12h16" },
                      { d: "M4 6h16" }
                    ]
                  }}
                  transition={{ duration: 0.2 }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </motion.svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenu && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 top-16 bg-black/50 backdrop-blur-sm lg:hidden -z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={toggleMobileMenu}
              />

              {/* Menu panel */}
              <motion.div
                className="lg:hidden mobile-menu bg-white/95 backdrop-blur-xl border-t border-white/20 shadow-xl -z-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="px-4 sm:px-6 lg:px-8 py-6">
                  <div className="space-y-2">
                    {navItems.map((item, index) => (
                      <motion.button
                        key={item.label}
                        onClick={() => {
                          (item.action || (() => navigate(item.to)))();
                          toggleMobileMenu();
                        }}
                        className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left hover:bg-orange-50 hover:text-orange-600 transition-all duration-200 group"
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <motion.span
                          className="text-2xl group-hover:scale-110 transition-transform duration-200"
                          whileHover={{ rotate: 10 }}
                        >
                          {item.icon}
                        </motion.span>
                        <span className="font-medium">{item.label}</span>

                        {/* Active indicator */}
                        {location.pathname === item.to && (
                          <motion.div
                            className="ml-auto w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full"
                            layoutId="mobileActive"
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>

                  {/* Auth actions */}
                  <div className="mt-8 pt-6 border-t border-gray-200 space-y-3">
                    <Link to="/login" onClick={toggleMobileMenu}>
                      <motion.button
                        className="w-full px-4 py-3 text-left font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-colors"
                        whileTap={{ scale: 0.98 }}
                      >
                        Sign In
                      </motion.button>
                    </Link>

                    <Link to="/dashboard" onClick={toggleMobileMenu}>
                      <motion.button
                        className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg transition-shadow"
                        whileTap={{ scale: 0.98 }}
                      >
                        Dashboard
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}