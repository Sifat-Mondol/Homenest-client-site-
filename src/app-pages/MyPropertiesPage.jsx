// src/app-pages/MyPropertiesPage.jsx
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth-context/AuthProvider";
import api from "../api-services/apiClient";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../ui-components/LoadingSpinner";
import { FiEdit, FiTrash2, FiEye, FiCalendar, FiMapPin, FiDollarSign } from "react-icons/fi";
import { format } from "date-fns";

export default function MyPropertiesPage() {
  const { user } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProperties = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await api.get(`/properties/by-user/${user.email}`);
      setProperties(res.data);
    } catch (err) {
      Swal.fire("Error", err.response?.data?.error || "Failed to fetch properties", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [user]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This property will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!"
    });

    if (confirm.isConfirmed) {
      try {
        await api.delete(`/properties/${id}`);
        Swal.fire("Deleted!", "Property has been deleted.", "success");
        setProperties(properties.filter((p) => p._id !== id));
      } catch (err) {
        Swal.fire("Error", err.response?.data?.error || "Failed to delete", "error");
      }
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--bg-secondary)]">
        <p className="text-xl text-[var(--text-secondary)] mb-4">Please login to see your properties</p>
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
        >
          Go to Login
        </button>
      </div>
    );
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="py-12 bg-[var(--bg-secondary)] min-h-screen">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            My Properties
          </h1>
          <p className="text-[var(--text-secondary)] text-lg">
            Manage all your listed properties
          </p>
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏠</div>
            <p className="text-[var(--text-secondary)] text-xl mb-6">
              You haven't added any properties yet
            </p>
            <button
              onClick={() => navigate("/add-property")}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:scale-105 transition-transform"
            >
              Add Your First Property
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div
                key={property._id}
                className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl shadow-lg overflow-hidden card-hover"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={property.image || "https://via.placeholder.com/400x300"}
                    alt={property.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {property.category}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-xl font-bold text-[var(--text-primary)] line-clamp-1">
                    {property.name}
                  </h3>

                  <div className="space-y-2 text-sm text-[var(--text-secondary)]">
                    <div className="flex items-center gap-2">
                      <FiDollarSign className="text-green-500" />
                      <span className="font-semibold">৳ {property.price?.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <FiMapPin className="text-red-500" />
                      <span className="truncate">{property.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <FiCalendar className="text-blue-500" />
                      <span>
                        {property.createdAt
                          ? format(new Date(property.createdAt), "MMM dd, yyyy")
                          : "N/A"}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-3">
                    <button
                      onClick={() => navigate(`/property-details/${property._id}`)}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-semibold"
                    >
                      <FiEye /> View
                    </button>
                    
                    <button
                      onClick={() => navigate(`/update-property/${property._id}`)}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition text-sm font-semibold"
                    >
                      <FiEdit /> Update
                    </button>
                    
                    <button
                      onClick={() => handleDelete(property._id)}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-semibold"
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
 }