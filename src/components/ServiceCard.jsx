import React from "react";
import { Link } from "react-router-dom";

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
  let cardClasses = "bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 overflow-hidden";

  if (variant === "featured") {
    cardClasses += " shadow-lg border-indigo-200";
  }

  const iconBgColors = {
    "Professional Plumbing": "bg-blue-500",
    "Electrical Services": "bg-yellow-500",
    "Home Deep Cleaning": "bg-green-500",
    "AC & HVAC Service": "bg-cyan-500",
    "Professional Painting": "bg-pink-500",
    "Carpentry & Work": "bg-amber-600",
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
    <div className={cardClasses}>
      {/* Hero Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Icon & Featured Badge */}
        <div className="absolute top-4 left-4 flex items-center justify-between w-full pr-4">
          <div className={`w-10 h-10 rounded-lg ${iconBgColors[service.title] || 'bg-blue-500'} flex items-center justify-center shadow-md`}>
            <span className="text-lg">{serviceIcons[service.title] || service.icon || "🛠️"}</span>
          </div>
          {service.featured && (
            <div className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full shadow-md">
              Featured
            </div>
          )}
        </div>

        {/* Price Tag */}
        <div className="absolute bottom-4 right-4">
          <div className={`px-3 py-1 ${iconBgColors[service.title] || 'bg-blue-500'} text-white rounded-lg shadow-md font-semibold text-base`}>
            ₹{service.price}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 bg-white">

        {/* Service Title & Subtitle */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            {service.title}
          </h3>
          <p className="text-gray-600 text-sm">
            {service.short}
          </p>
        </div>

        {/* Service Description */}
        <p className="text-gray-700 text-sm leading-relaxed mb-4">
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
                <span>{item}</span>
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
            <button className={`w-full py-3 px-4 ${iconBgColors[service.title] || 'bg-blue-500'} text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-shadow duration-200 flex items-center justify-center gap-2`}>
              <span>View Full Details</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </Link>

          {/* Quick Book CTA */}
          <button
            className="w-full py-2 px-4 bg-gray-100 text-gray-800 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 border border-gray-200"
            onClick={() => window.location.href = `/booking/${service.id}`}
          >
            Quick Book Now
          </button>
        </div>
      </div>
    </div>
  );
}