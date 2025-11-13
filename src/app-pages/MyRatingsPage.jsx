// src/app-pages/MyRatingsPage.jsx
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth-context/AuthProvider";
import api from "../api-services/apiClient";
import LoadingSpinner from "../ui-components/LoadingSpinner";
import Swal from "sweetalert2";
import { FiStar, FiCalendar, FiHome } from "react-icons/fi";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

export default function MyRatingsPage() {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await api.get(`/ratings?reviewerEmail=${user.email}`);
        setReviews(Array.isArray(res.data) ? res.data : res.data?.data || []);
      } catch (err) {
        Swal.fire("Error", err.response?.data?.error || "Failed to fetch reviews", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [user]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FiStar
        key={i}
        className={`${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--bg-secondary)] px-4">
        <p className="text-xl text-[var(--text-secondary)] mb-4">Please login to view your ratings</p>
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
      <div className="container mx-auto px-4 max-w-4xl">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            My Ratings & Reviews
          </h1>
          <p className="text-[var(--text-secondary)] text-lg">
            View all the reviews you've submitted
          </p>
        </div>

        {reviews.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">⭐</div>
            <p className="text-[var(--text-secondary)] text-xl mb-6">
              You haven't left any reviews yet
            </p>
            <button
              onClick={() => navigate("/all-properties")}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:scale-105 transition-transform"
            >
              Browse Properties
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow card-hover"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-[var(--text-primary)] mb-2">
                      <FiHome className="text-blue-600" />
                      <h3 className="text-xl font-bold">
                        {review.propertyName || "Unknown Property"}
                      </h3>
                    </div>
                    
                    {review.propertyImage && (
                      <img
                        src={review.propertyImage}
                        alt={review.propertyName}
                        className="w-full h-40 object-cover rounded-lg mt-3 border border-[var(--border-color)]"
                      />
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {renderStars(review.rating || 0)}
                  </div>
                  <span className="text-lg font-bold text-[var(--text-primary)]">
                    {review.rating}/5
                  </span>
                </div>

                <div className="bg-[var(--bg-secondary)] p-4 rounded-xl mb-3">
                  <p className="text-[var(--text-primary)] leading-relaxed">
                    "{review.comment || "No comment provided"}"
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                  <FiCalendar />
                  <span>
                    Reviewed on{" "}
                    {review.createdAt
                      ? format(new Date(review.createdAt), "MMMM dd, yyyy")
                      : "N/A"}
                  </span>
                </div>

                {review.propertyId && (
                  <button
                    onClick={() => navigate(`/property-details/${review.propertyId}`)}
                    className="mt-4 w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:scale-105 transition-transform"
                  >
                    View Property Details
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {reviews.length > 0 && (
          <div className="mt-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 text-center shadow-2xl">
            <h2 className="text-3xl font-bold mb-4">Your Review Stats</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-4xl font-bold mb-2">{reviews.length}</p>
                <p className="text-lg">Total Reviews</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">
                  {(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)}
                </p>
                <p className="text-lg">Average Rating</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">
                  {reviews.filter((r) => r.rating === 5).length}
                </p>
                <p className="text-lg">5-Star Reviews</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
 }