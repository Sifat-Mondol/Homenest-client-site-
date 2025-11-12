import React from "react";
import { Link } from "react-router-dom";

const PropertyItem = ({ property }) => {
  return (
    <div className="border rounded-md shadow-sm overflow-hidden hover:shadow-lg transition">
      <img
        src={property.image}
        alt={property.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold">{property.name}</h3>
        <p className="text-sm text-gray-500">{property.category}</p>
        <p className="mt-2 text-gray-700">{property.description.slice(0, 80)}...</p>
        <p className="mt-2 font-semibold">{property.price} BDT</p>
        <p className="text-sm text-gray-500">{property.location}</p>
        <Link
          to={`/property-details/${property._id}`}
          className="mt-2 inline-block px-4 py-1 bg-blue-600 text-white rounded"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyItem;
