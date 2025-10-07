import React, { useState } from "react";
import { motion } from "framer-motion";

export default function SearchBar({ onSearch, placeholder = "Search for services..." }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="relative max-w-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 pl-12 rounded-xl border-0 shadow-sm focus:ring-2 focus:ring-accent focus:outline-none"
        aria-label="Search services"
      />
      <svg
        className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <button type="submit" className="sr-only">Search</button>
    </motion.form>
  );
}