import React, { useEffect, useState } from "react";
import PropertyItem from "../ui-components/PropertyItem";
import api from "../api-services/apiClient";
import LoadingSpinner from "../ui-components/LoadingSpinner";
import Swal from "sweetalert2";

const AllPropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date_desc"); // default newest first

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/properties?search=${search}&sortBy=${sort}`);
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
  }, [search, sort]);

  return (
    <div className="my-8 max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">All Properties</h2>

      {/* Search and Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <input
          type="text"
          placeholder="Search by property name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full sm:w-1/2"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="select select-bordered w-full sm:w-1/4"
        >
          <option value="date_desc">Newest First</option>
          <option value="date_asc">Oldest First</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>

      {/* Properties Grid */}
      {loading ? (
        <LoadingSpinner />
      ) : properties.length === 0 ? (
        <p className="text-center py-10 text-gray-500">No properties found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((property) => (
            <PropertyItem key={property._id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPropertiesPage;
