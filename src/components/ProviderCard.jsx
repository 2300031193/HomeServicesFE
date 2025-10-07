import React from "react";
import { motion } from "framer-motion";

export default function ProviderCard({ provider }) {
  return (
    <motion.div
      className="bg-white rounded-xl shadow p-4"
      whileHover={{ scale: 1.01 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-4">
        <img
          src={provider.avatar || '/placeholder-avatar.jpg'}
          alt={`${provider.name} profile`}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold">{provider.name}</h3>
          <p className="text-sm text-gray-500">{provider.specialty}</p>
          <div className="flex items-center gap-2 mt-1">
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className={`text-sm ${i < Math.floor(provider.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
              >
                ★
              </span>
            ))}
            <span className="text-xs text-gray-500">({provider.reviewCount})</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}