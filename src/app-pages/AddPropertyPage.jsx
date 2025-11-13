// src/app-pages/AddPropertyPage.jsx
import React, { useContext, useState } from "react";
import { AuthContext } from "../auth-context/AuthProvider";
import Swal from "sweetalert2";
import api from "../api-services/apiClient";
import { FiHome, FiDollarSign, FiMapPin, FiImage, FiFileText, FiTag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function AddPropertyPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Rent",
    price: "",
    location: "",
    image: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      Swal.fire("Unauthorized", "You must be logged in to add a property", "error");
      return;
    }

    setSubmitting(true);

    const payload = {
      ...formData,
      price: Number(formData.price),
      userEmail: user.email,
      userName: user.displayName || "Anonymous",
      createdAt: new Date().toISOString()
    };

    try {
      const res = await api.post("/properties", payload);
      if (res.data.success || res.data._id) {
        Swal.fire({
          icon: "success",
          title: "Property Added!",
          text: "Your property has been successfully listed.",
          confirmButtonColor: "#3b82f6"
        });
        setFormData({
          name: "",
          description: "",
          category: "Rent",
          price: "",
          location: "",
          image: ""
        });
        navigate("/my-properties");
      } else {
        Swal.fire("Error", "Failed to add property", "error");
      }
    } catch (err) {
      Swal.fire("Error", err.response?.data?.error || "Something went wrong", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 bg-[var(--bg-secondary)] min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Add New Property
          </h1>
          <p className="text-[var(--text-secondary)] text-lg">
            List your property and reach thousands of potential buyers
          </p>
        </div>

        <div className="bg-[var(--card-bg)] rounded-2xl shadow-2xl p-8 border border-[var(--border-color)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
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
            </div>

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[var(--bg-secondary)] p-4 rounded-xl">
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

            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-4 rounded-xl text-white font-bold text-lg transition-all shadow-lg ${
                submitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 btn-animate"
              }`}
            >
              {submitting ? "Adding Property..." : "🚀 Add Property"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
 }