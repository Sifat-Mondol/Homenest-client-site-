// src/app-pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import HeroSlider from "../ui-components/HeroSlider";
import PropertyItem from "../ui-components/PropertyItem";
import api from "../api-services/apiClient";
import LoadingSpinner from "../ui-components/LoadingSpinner";
import Swal from "sweetalert2";
import { FiCheckCircle, FiShield, FiTrendingUp, FiUsers, FiAward, FiHeadphones } from "react-icons/fi";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      setLoading(true);
      try {
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

  const features = [
    {
      icon: <FiCheckCircle className="text-5xl text-green-500" />,
      title: "Verified Listings",
      description: "All properties are thoroughly verified for authenticity and quality"
    },
    {
      icon: <FiShield className="text-5xl text-blue-500" />,
      title: "Secure Transactions",
      description: "Your data and transactions are protected with top-level security"
    },
    {
      icon: <FiTrendingUp className="text-5xl text-purple-500" />,
      title: "Best Deals",
      description: "Get access to exclusive deals and competitive pricing"
    },
    {
      icon: <FiHeadphones className="text-5xl text-orange-500" />,
      title: "24/7 Support",
      description: "Our dedicated team is always here to assist you"
    }
  ];

  return (
    <div className="flex flex-col gap-0">
      <HeroSlider />

      <section className="py-16 bg-[var(--bg-secondary)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Featured Properties
            </h2>
            <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
              Discover our handpicked selection of the newest and most sought-after properties
            </p>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : featuredProperties.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[var(--text-secondary)] text-lg mb-6">
                No featured properties available at the moment.
              </p>
              <Link
                to="/add-property"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:scale-105 transition-transform inline-block"
              >
                Be the First to List
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((property) => (
                <PropertyItem key={property._id} property={property} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/all-properties"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:scale-105 transition-transform inline-block shadow-lg"
            >
              View All Properties →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--bg-primary)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Why Choose HomeNest?
            </h2>
            <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
              We're committed to providing the best real estate experience with transparency, security, and trust
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-8 text-center card-hover shadow-lg"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg max-w-2xl mx-auto opacity-90">
              Join thousands of satisfied customers who found their dream properties with us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Ahmed Hassan",
                role: "Property Owner",
                feedback: "HomeNest made selling my property so easy! The platform is user-friendly and I got genuine buyers within days.",
                rating: 5
              },
              {
                name: "Fatima Rahman",
                role: "First-time Buyer",
                feedback: "I found my dream apartment through HomeNest. The search filters and detailed listings made the process seamless!",
                rating: 5
              },
              {
                name: "Karim Ali",
                role: "Real Estate Investor",
                feedback: "Best real estate platform in Bangladesh! Professional, reliable, and packed with great deals.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-300 text-xl">★</span>
                  ))}
                </div>
                <p className="text-white/90 mb-6 italic leading-relaxed">
                  "{testimonial.feedback}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-white/70">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--bg-primary)]">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Find Your Dream Property?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Start your journey today! Browse thousands of properties or list your own for free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/all-properties"
                className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:scale-105 transition-transform shadow-lg"
              >
                Browse Properties
              </Link>
              <Link
                to="/add-property"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transition"
              >
                List Your Property
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

 export default HomePage;