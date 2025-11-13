// src/ui-components/PropertyItem.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FiMapPin, FiTag, FiUser, FiEye } from "react-icons/fi";

const PropertyItem = ({ property }) => {
  return (
    <div className="bg-[var(--card-bg)] rounded-2xl shadow-lg overflow-hidden card-hover border border-[var(--border-color)] transition-all duration-300">
      <div className="relative overflow-hidden h-56">
        <img
          src={property.image || "https://via.placeholder.com/400x300?text=No+Image"}
          alt={property.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        
        <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
          {property.category}
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-1 rounded-full text-sm font-bold shadow-lg">
          ৳ {property.price?.toLocaleString()}
        </div>
      </div>

      <div className="p-5 space-y-3">
        <h3 className="text-xl font-bold text-[var(--text-primary)] line-clamp-1 hover:text-blue-600 transition">
          {property.name}
        </h3>

        <p className="text-sm text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
          {property.description || "No description available"}
        </p>

        <div className="flex items-center gap-2 text-[var(--text-secondary)]">
          <FiMapPin className="text-red-500" />
          <span className="text-sm truncate">{property.location}</span>
        </div>

        <div className="flex items-center gap-2 text-[var(--text-secondary)]">
          <FiUser className="text-blue-500" />
          <span className="text-sm truncate">By: {property.userName || "Anonymous"}</span>
        </div>

        <Link
          to={`/property-details/${property._id}`}
          className="mt-4 w-full flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:scale-105 transition-transform shadow-md btn-animate"
        >
          <FiEye /> View Details
        </Link>
      </div>

      <div className="h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
    </div>
  );
};

 export default PropertyItem;