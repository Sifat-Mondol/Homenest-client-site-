// src/ui-components/ReviewCard.jsx
import React from "react";
import { FiStar, FiUser, FiCalendar } from "react-icons/fi";
import { format } from "date-fns";

const ReviewCard = ({ review }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FiStar
        key={i}
        className={`${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-5 shadow-md hover:shadow-xl transition-shadow fade-in">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
            {review.reviewerName?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div>
            <p className="font-semibold text-[var(--text-primary)]">
              {review.reviewerName || "Anonymous"}
            </p>
            <div className="flex items-center gap-1 text-sm text-[var(--text-secondary)]">
              <FiCalendar className="text-xs" />
              {review.createdAt
                ? format(new Date(review.createdAt), "MMM dd, yyyy")
                : "N/A"}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {renderStars(review.rating || 0)}
        </div>
      </div>

      {review.propertyName && (
        <div className="mb-2 text-sm text-[var(--text-secondary)] flex items-center gap-2">
          <span className="font-medium">Property:</span>
          <span className="italic">{review.propertyName}</span>
        </div>
      )}

      <p className="text-[var(--text-primary)] leading-relaxed mt-2">
        {review.comment || "No comment provided"}
      </p>

      <div className="mt-4 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
    </div>
  );
};

 export default ReviewCard;