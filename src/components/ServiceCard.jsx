import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const serviceIcons = {
  "Professional Plumbing": "🔧",
  "Electrical Services": "⚡",
  "Home Deep Cleaning": "🧹",
  "AC & HVAC Service": "❄️",
  "Professional Painting": "🎨",
  "Carpentry & Woodwork": "🔨",
  "Smart Home Installation": "🤖",
  "Bathroom Renovation": "🚿",
  "Flooring Solutions": "🏠",
  "Pest Control Solutions": "🐛",
  "Kitchen Appliances Repair": "⚙️",
  "Garden & Landscaping": "🌳",
  "Roofing & Gutter Service": "🏠",
  "Window Installation & Repair": "🪟",
  "Security System Installation": "🛡️",
  "Pool & Spa Maintenance": "🏊",
  "Chimney & Fireplace Service": "🏠",
  "Handyman Services": "🔧"
};

export default function ServiceCard({ service, index = 0, variant = "default" }) {
  let cardClasses = "relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden group cursor-pointer";

  if (variant === "featured") {
    cardClasses += " shadow-2xl hover:shadow-3xl border-purple-200";
  }

  const cardVariants = {
    default: {
      initial: { opacity: 0, y: 25 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, delay: index * 0.08 }
    },
    featured: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.5, delay: index * 0.1 }
    }
  };

  const iconBgColors = {
    "Professional Plumbing": "bg-blue-500",
    "Electrical Services": "bg-yellow-500",
    "Home Deep Cleaning": "bg-green-500",
    "AC & HVAC Service": "bg-cyan-500",
    "Professional Painting": "bg-pink-500",
    "Carpentry & Woodwork": "bg-amber-600",
    "Smart Home Installation": "bg-purple-500",
    "Bathroom Renovation": "bg-teal-500",
    "Flooring Solutions": "bg-gray-600",
    "Pest Control Solutions": "bg-red-500",
    "Kitchen Appliances Repair": "bg-indigo-500",
    "Garden & Landscaping": "bg-emerald-500",
    "Roofing & Gutter Service": "bg-gray-700",
    "Window Installation & Repair": "bg-slate-500",
    "Security System Installation": "bg-red-600",
    "Pool & Spa Maintenance": "bg-blue-600",
    "Chimney & Fireplace Service": "bg-orange-700",
    "Handyman Services": "bg-gray-500"
  };

  return (
    <motion.div
      className={cardClasses}
      variants={cardVariants[variant] || cardVariants.default}
      initial="initial"
      animate="animate"
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 25 }
      }}
    >
      {/* Hero Image Section */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/40" />

        {/* Icon & Featured Badge */}
        <div className="absolute top-4 left-4 flex items-center justify-between w-full pr-4">
          <div className={`w-12 h-12 rounded-xl ${iconBgColors[service.title] || 'bg-blue-500'} flex items-center justify-center shadow-lg`}>
            <span className="text-xl">{serviceIcons[service.title] || service.icon || "🛠️"}</span>
          </div>
          {service.featured && (
            <div className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              ★ FEATURED
            </div>
          )}
        </div>

        {/* Price Tag */}
        <div className="absolute bottom-4 right-4">
          <div className={`px-4 py-2 ${iconBgColors[service.title] || 'bg-blue-500'} text-white rounded-xl shadow-xl font-bold text-lg backdrop-blur-sm`}>
            ₹{service.price}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 bg-white">

        {/* Service Title & Subtitle */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
            {service.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-1">
            {service.short}
          </p>
        </div>

        {/* Service Description */}
        <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
          {service.long}
        </p>

        {/* What's Included */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            What's Included
          </h4>
          <div className="space-y-2">
            {service.includes.slice(0, 3).map((item, idx) => (
              <div key={idx} className="flex items-center text-xs text-gray-600">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 flex-shrink-0"></div>
                <span className="line-clamp-1">{item}</span>
              </div>
            ))}
            {service.includes.length > 3 && (
              <div className="text-xs text-gray-500 font-medium ml-3.5">
                +{service.includes.length - 3} more services
              </div>
            )}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">

          {/* Primary CTA */}
          <Link to={`/service/${service.id}`} className="block">
            <motion.button
              className={`w-full py-3 px-4 ${iconBgColors[service.title] || 'bg-blue-500'} text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>View Full Details</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </Link>

          {/* Quick Book CTA */}
          <motion.button
            className="w-full py-2 px-4 bg-gray-100 text-gray-800 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200 border border-gray-200"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.href = `/booking/${service.id}`}
          >
            Quick Book Now
          </motion.button>
        </div>

        {/* Decorative Elements */}
        <div className={`mt-4 h-1 bg-gradient-to-r ${iconBgColors[service.title]?.replace('bg-', 'from-') || 'from-blue-500'} to-transparent rounded-full`} />
      </div>

      {/* Hover Shadow Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      />
    </motion.div>
  );
}