import React, { useEffect, useState } from "react";
import PropertyItem from "../ui-components/PropertyItem";
import api from "../api-services/apiClient";
import LoadingSpinner from "../ui-components/LoadingSpinner";
import Swal from "sweetalert2";
import { FiSearch, FiFilter } from "react-icons/fi";

const AllPropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date_desc");

  // Map sort value to backend-friendly query
  const getSortQuery = (sortOption) => {
    switch (sortOption) {
      case "date_desc":
        return { sortField: "createdAt", sortOrder: -1 };
      case "date_asc":
        return { sortField: "createdAt", sortOrder: 1 };
      case "price_asc":
        return { sortField: "price", sortOrder: 1 };
      case "price_desc":
        return { sortField: "price", sortOrder: -1 };
      default:
        return { sortField: "createdAt", sortOrder: -1 };
    }
  };

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const { sortField, sortOrder } = getSortQuery(sort);
      const res = await api.get(
        `/properties?search=${search}&sortField=${sortField}&sortOrder=${sortOrder}`
      );
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
    <div className="py-12 bg-[var(--bg-secondary)] min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            All Properties
          </h1>
          <p className="text-[var(--text-secondary)] text-lg">
            Browse through our extensive collection of properties
          </p>
        </div>

        {/* Filter & Sort Section */}
        <div className="bg-[var(--card-bg)] rounded-2xl shadow-lg p-6 mb-8 border border-[var(--border-color)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)] text-xl" />
              <input
                type="text"
                placeholder="Search by property name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-[var(--border-color)] rounded-xl bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div className="relative">
              <FiFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)] text-xl" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-[var(--border-color)] rounded-xl 
                           bg-[var(--bg-primary)] text-[var(--text-primary)] 
                           focus:outline-none focus:ring-2 focus:ring-purple-500 transition cursor-pointer
                           dark:bg-gray-800 dark:text-gray-100"
              >
                <option value="date_desc">⬇️ Newest First</option>
                <option value="date_asc">⬆️ Oldest First</option>
                <option value="price_asc">💰 Price: Low to High</option>
                <option value="price_desc">💎 Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="mt-4 text-center text-sm text-[var(--text-secondary)]">
            {!loading && (
              <p>
                Found{" "}
                <span className="font-bold text-blue-600">{properties.length}</span>{" "}
                {properties.length === 1 ? "property" : "properties"}
              </p>
            )}
          </div>
        </div>

        {/* Properties List */}
        {loading ? (
          <LoadingSpinner />
        ) : properties.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏠</div>
            <p className="text-[var(--text-secondary)] text-xl mb-6">
              No properties found matching your criteria
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSort("date_desc");
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.map((property) => (
              <PropertyItem key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPropertiesPage;