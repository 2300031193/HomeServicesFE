import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Services",
      links: [
        { to: "/services", label: "All Services" },
        { to: "/", label: "Book Now" },
        { to: "#", label: "Emergency Services" },
        { to: "/dashboard", label: "My Bookings" }
      ]
    },
    {
      title: "Company",
      links: [
        { to: "/about", label: "About Us" },
        { to: "/contact", label: "Contact" },
        { to: "#", label: "Careers" },
        { to: "#", label: "Press" }
      ]
    },
    {
      title: "Support",
      links: [
        { to: "#", label: "Help Center" },
        { to: "#", label: "Customer Support" },
        { to: "#", label: "Trust & Safety" },
        { to: "#", label: "Privacy Policy" }
      ]
    }
  ];

  const handleNewsletter = (e) => {
    e.preventDefault();
    // Mock newsletter signup
    alert("Thank you for subscribing! We'll keep you updated.");
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="font-bold text-lg">HS</span>
              </div>
              <Link to="/" className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                  HomeServices
                </span>
              </Link>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Connecting homeowners with trusted, certified professionals for all your home service needs.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { icon: "📘", label: "Facebook" },
                { icon: "🐦", label: "Twitter" },
                { icon: "📷", label: "Instagram" },
                { icon: "💼", label: "LinkedIn" }
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-lg hover:bg-orange-600 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-gray-300 hover:text-orange-400 transition-colors duration-200 relative group"
                    >
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-200"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter */}
        <motion.div
          className="bg-gray-800 rounded-xl p-8 mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-6">
              Get the latest tips, service updates, and exclusive offers
            </p>
            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {[
            { number: "50K+", label: "Services Completed" },
            { number: "15K+", label: "Happy Customers" },
            { number: "850+", label: "Verified Professionals" },
            { number: "99%", label: "Satisfaction Rate" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom */}
        <motion.div
          className="border-t border-gray-800 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} HomeServices. All rights reserved.
              <span className="block md:inline md:ml-2">
                Built with ❤️ using React & Framer Motion
              </span>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                Terms of Service
              </Link>
              <Link to="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}