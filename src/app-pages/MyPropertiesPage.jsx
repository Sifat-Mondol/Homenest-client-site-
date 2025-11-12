import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth-context/AuthProvider";
import api from "../api-services/apiClient"; // axios instance
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../ui-components/LoadingSpinner";

export default function MyPropertiesPage() {
  const { user } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch logged-in user's properties
  const fetchProperties = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await api.get(`/properties/by-user/${user.email}`);
      setProperties(res.data);
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.error || "Failed to fetch properties",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [user]);

  // Delete property
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This property will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await api.delete(`/properties/${id}`);
        Swal.fire("Deleted!", "Property has been deleted.", "success");
        setProperties(properties.filter((p) => p._id !== id)); // remove from UI
      } catch (err) {
        Swal.fire(
          "Error",
          err.response?.data?.error || "Failed to delete",
          "error"
        );
      }
    }
  };

  if (!user)
    return (
      <p className="text-center py-10">
        Please login to see your properties.
      </p>
    );
  if (loading) return <LoadingSpinner />; // use spinner for consistency

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">My Properties</h2>
      {properties.length === 0 && <p>No properties found.</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div
            key={property._id}
            className="border rounded shadow p-4 flex flex-col"
          >
            <img
              src={property.image || "/placeholder.png"}
              alt={property.name}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="text-lg font-bold mt-2">{property.name}</h3>
            <p className="text-sm text-gray-500">{property.category}</p>
            <p className="mt-1 font-semibold">{property.price} BDT</p>
            <p className="text-sm text-gray-500">{property.location}</p>
            <p className="text-sm text-gray-400">
              Posted on: {new Date(property.createdAt).toLocaleDateString()}
            </p>
            <div className="mt-2 flex gap-2 flex-wrap">
              <button
                onClick={() => navigate(`/properties/${property._id}`)}
                className="btn btn-sm btn-info"
              >
                View Details
              </button>
              <button
                onClick={() => navigate(`/update-property/${property._id}`)}
                className="btn btn-sm btn-warning"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(property._id)}
                className="btn btn-sm btn-error"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
