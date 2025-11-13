// src/app-pages/UpdatePropertyPage.jsx
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth-context/AuthProvider";
import api from "../api-services/apiClient";
import Swal from "sweetalert2";
import LoadingSpinner from "../ui-components/LoadingSpinner";
import { FiHome, FiDollarSign, FiMapPin, FiImage, FiFileText, FiTag, FiArrowLeft } from "react-icons/fi";

export default function UpdatePropertyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Rent",
    price: "",
    location: "",
    image: ""
  });
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await api.get(`/properties/${id}`);
        const property = res.data;
        
        // Authorization check
        if (!user || property.userEmail !== user.email) {
          Swal.fire({
            icon: "error",
            title: "Unauthorized",
            text: "You cannot edit this property",
            confirmButtonColor: "#ef4444"
          });
          return navigate("/my-properties");
        }
        
        setFormData({
          name: property.name,
          description: property.description,
          category: property.category,
          price: property.price,
          location: property.location,
          image: property.image
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response?.data?.error || "Failed to fetch property",
          confirmButtonColor: "#ef4444"
        });
        navigate("/my-properties");
      } finally {
        setLoading(false);
      }
    };
    
    if (user) fetchProperty();
  }, [id, user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const payload = {
        ...formData,
        price: Number(formData.price)
      };
      
      await api.put(`/properties/${id}`, payload);
      
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Property has been updated successfully",
        confirmButtonColor: "#3b82f6",
        timer: 2000
      });
      
      // Navigate to property details page
      navigate(`/property-details/${id}`);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err.response?.data?.error || "Failed to update property",
        confirmButtonColor: "#ef4444"
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="py-12 bg-[var(--bg-secondary)] min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-blue-600 transition mb-6"
        >
          <FiArrowLeft /> Back
        </button>

        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Update Property
          </h1>
          <p className="text-[var(--text-secondary)] text-lg">
            Make changes to your property listing
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-[var(--card-bg)] rounded-2xl shadow-2xl p-8 border border-[var(--border-color)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Property Name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] mb-2">
                <FiHome className="text-blue-600" /> Property Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Modern 3BHK Apartment"
                className="w-full px-4 py-3 border border-[var(--border-color)] rounded-xl bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] mb-2">
                <FiTag className="text-purple-600" /> Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[var(--border-color)] rounded-xl bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-purple-500 transition cursor-pointer"
                required
              >
                <option value="Rent">🏠 Rent</option>
                <option value="Sale">💰 Sale</option>
                <option value="Commercial">🏢 Commercial</option>
                <option value="Land">🌳 Land</option>
              </select>
            </div>

            {/* Price and Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Price */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] mb-2">
                  <FiDollarSign className="text-green-600" /> Price (BDT)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g., 5000000"
                  className="w-full px-4 py-3 border border-[var(--border-color)] rounded-xl bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                  min="0"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] mb-2">
                  <FiMapPin className="text-red-600" /> Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., Dhanmondi, Dhaka"
                  className="w-full px-4 py-3 border border-[var(--border-color)] rounded-xl bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                  required
                />
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] mb-2">
                <FiImage className="text-yellow-600" /> Image URL
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 border border-[var(--border-color)] rounded-xl bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                required
              />
              
              {/* Image Preview */}
              {formData.image && (
                <div className="mt-4">
                  <p className="text-sm text-[var(--text-secondary)] mb-2">Preview:</p>
                  <img
                    src={formData.image}
                    alt="Property Preview"
                    className="w-full h-48 object-cover rounded-xl border border-[var(--border-color)] shadow-md"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x300?text=Invalid+Image";
                    }}
                  />
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] mb-2">
                <FiFileText className="text-indigo-600" /> Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your property in detail..."
                rows="5"
                className="w-full px-4 py-3 border border-[var(--border-color)] rounded-xl bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
                required
              ></textarea>
            </div>

            {/* Read-only User Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[var(--bg-secondary)] p-4 rounded-xl border border-[var(--border-color)]">
              <div>
                <label className="text-sm font-semibold text-[var(--text-secondary)] mb-1 block">
                  Your Name
                </label>
                <input
                  type="text"
                  value={user?.displayName || "Anonymous"}
                  className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-[var(--text-primary)] cursor-not-allowed"
                  readOnly
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-[var(--text-secondary)] mb-1 block">
                  Your Email
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-[var(--text-primary)] cursor-not-allowed"
                  readOnly
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 py-3 border-2 border-[var(--border-color)] text-[var(--text-primary)] rounded-xl font-semibold hover:bg-[var(--bg-secondary)] transition"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={submitting}
                className={`flex-1 py-3 rounded-xl text-white font-bold transition-all shadow-lg ${
                  submitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 btn-animate"
                }`}
              >
                {submitting ? "Updating..." : "✅ Update Property"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
 }