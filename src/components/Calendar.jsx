import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Calendar({ selectedDate, onDateSelect, availableDates = [] }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const prevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const isDateToday = (day) => {
    const today = new Date();
    return day === today.getDate() &&
           currentMonth.getMonth() === today.getMonth() &&
           currentMonth.getFullYear() === today.getFullYear();
  };

  const isDateSelected = (day) => {
    if (!selectedDate) return false;
    const selected = new Date(selectedDate);
    return day === selected.getDate() &&
           currentMonth.getMonth() === selected.getMonth() &&
           currentMonth.getFullYear() === selected.getFullYear();
  };

  const isDateAvailable = (day) => {
    // Mock available dates - in real app, this would come from API
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return availableDates.includes(dateStr) || !availableDates.length;
  };

  const handleDateClick = (day) => {
    if (!isDateAvailable(day)) return;
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    onDateSelect(selectedDate.toISOString().split('T')[0]);
  };

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <motion.div
      className="bg-white rounded-xl shadow p-4"
      initial={reduceMotion ? {} : { opacity: 0, scale: 0.95 }}
      animate={reduceMotion ? {} : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-4">
        <button
          type="button"
          onClick={prevMonth}
          className="p-1 hover:bg-gray-100 rounded"
          aria-label="Previous month"
        >
          ‹
        </button>
        <h3 className="font-semibold text-lg">
          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h3>
        <button
          type="button"
          onClick={nextMonth}
          className="p-1 hover:bg-gray-100 rounded"
          aria-label="Next month"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array(firstDayOfMonth).fill(null).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => (
          <button
            key={day}
            type="button"
            onClick={() => handleDateClick(day)}
            disabled={!isDateAvailable(day)}
            className={`p-2 text-sm rounded-md transition-colors ${
              isDateSelected(day)
                ? 'bg-accent text-white'
                : isDateToday(day)
                ? 'bg-blue-100 text-blue-600'
                : isDateAvailable(day)
                ? 'hover:bg-gray-100'
                : 'text-gray-400 cursor-not-allowed'
            }`}
            aria-label={`Select ${currentMonth.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="mt-4 text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-100 rounded" />
          <span>Today</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-3 h-3 bg-accent rounded" />
          <span>Selected</span>
        </div>
      </div>
    </motion.div>
  );
}