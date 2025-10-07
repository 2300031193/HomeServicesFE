import React from "react";

export default function RatingStars({ rating, reviewCount, size = "sm", interactive = false, onRatingChange }) {
  const starSize = size === "lg" ? "text-lg" : size === "md" ? "text-base" : "text-sm";
  const stars = 5;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: stars }, (_, i) => {
        const filled = i < Math.floor(rating);
        const half = !filled && i === Math.floor(rating) && rating % 1 !== 0;

        return (
          <button
            key={i}
            type={interactive ? "button" : undefined}
            onClick={interactive ? () => onRatingChange(i + 1) : undefined}
            className={`${starSize} ${
              interactive
                ? "cursor-pointer hover:scale-110 transition-transform"
                : ""
            }`}
            aria-label={`Rate ${i + 1} out of 5 stars`}
          >
            {filled ? "★" : half ? "☆" : "☆"}
          </button>
        );
      })}
      {rating && (
        <span className="text-xs text-gray-500 ml-1">
          {reviewCount ? `(${reviewCount})` : ""}
        </span>
      )}
    </div>
  );
}