import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth-context/AuthProvider";
import api from "../api-services/apiClient";
import Swal from "sweetalert2";
import LoadingSpinner from "../ui-components/LoadingSpinner";

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
        if (!user || property.userEmail !== user.email) {
          Swal.fire("Unauthorized", "You cannot edit this property", "error");
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
        Swal.fire("Error", err.response?.data?.error || "Failed to fetch property", "error");
        navigate("/my-properties");
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchProperty();
  }, [id, user, navigate]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.put(`/properties/${id}`, formData);
      Swal.fire("Success", "Property updated successfully!", "success");
      navigate(`/properties/${id}`);
    } catch (err) {
      Swal.fire("Error", err.response?.data?.error || "Failed to update property", "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Update Property</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="select select-bordered w-full"
          required
        >
          <option>Rent</option>
          <option>Sale</option>
          <option>Commercial</option>
          <option>Land</option>
        </select>

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="input input-bordered w-full"
          min="0"
          required
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
          required
        />

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={submitting}
        >
          {submitting ? "Updating..." : "Update Property"}
        </button>
      </form>
    </div>
  );
}
