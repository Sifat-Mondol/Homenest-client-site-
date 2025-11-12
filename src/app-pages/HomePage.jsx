import React, { useEffect, useState } from "react";
import HeroSlider from "../ui-components/HeroSlider";
import PropertyItem from "../ui-components/PropertyItem";
import api from "../api-services/apiClient";
import LoadingSpinner from "../ui-components/LoadingSpinner";
import Swal from "sweetalert2";

const HomePage = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      setLoading(true);
      try {
        // Fetch featured 6 newest properties
        const res = await api.get("/properties/featured");
        setFeaturedProperties(res.data);
      } catch (err) {
        Swal.fire(
          "Error",
          err.response?.data?.error || "Failed to fetch featured properties",
          "error"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Featured Properties */}
      <section className="my-8 max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Featured Properties</h2>
        {loading ? (
          <LoadingSpinner />
        ) : featuredProperties.length === 0 ? (
          <p className="text-center py-10 text-gray-500">
            No featured properties available.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredProperties.map((property) => (
              <PropertyItem key={property._id} property={property} />
            ))}
          </div>
        )}
      </section>

      {/* Why Choose Us */}
      <section className="my-8 bg-gray-100 p-6 rounded max-w-7xl mx-auto shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Why Choose Us</h2>
        <p className="text-gray-700">
          We provide verified, high-quality real estate listings with fast and reliable
          support for our users. Our platform ensures transparency and trust, making it
          easy for buyers and sellers to connect.
        </p>
      </section>

      {/* Extra Section 1: Explore Services */}
      <section className="my-8 bg-white p-6 rounded max-w-7xl mx-auto shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Explore Our Services</h2>
        <p className="text-gray-700">
          Whether you want to rent, buy, or sell, HomeNest helps you find the best deals
          in your area. Browse properties, post your listings, and manage your properties
          easily with our intuitive platform.
        </p>
      </section>

      {/* Extra Section 2: Trusted by Thousands */}
      <section className="my-8 bg-gray-50 p-6 rounded max-w-7xl mx-auto shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Trusted by Thousands</h2>
        <p className="text-gray-700">
          Our platform is used by thousands of property owners and buyers, making
          HomeNest a trustworthy real estate portal. Join our growing community today
          and find your dream property with confidence.
        </p>
      </section>
    </div>
  );
};

export default HomePage;
