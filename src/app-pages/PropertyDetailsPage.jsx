// src/app-pages/PropertyDetailsPage.jsx
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api-services/apiClient";
import { AuthContext } from "../auth-context/AuthProvider";
import Swal from "sweetalert2";
import ReviewCard from "../ui-components/ReviewCard";
import LoadingSpinner from "../ui-components/LoadingSpinner";
import { FiMapPin, FiDollarSign, FiTag, FiUser, FiMail, FiCalendar, FiStar, FiArrowLeft } from "react-icons/fi";
import { format } from "date-fns";

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const resProperty = await api.get(`/properties/${id}`);
        setProperty(resProperty.data);

        const resRatings = await api.get(`/ratings?propertyId=${id}`);
        setRatings(Array.isArray(resRatings.data) ? resRatings.data : resRatings.data?.data || []);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response?.data?.error || "Failed to fetch data",
          confirmButtonColor: "#ef4444"
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setReviewForm({ ...reviewForm, [e.target.name]: e.target.value });
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to submit a review",
        confirmButtonColor: "#f59e0b"
      });
      return;
    }

    setSubmittingReview(true);

    const payload = {
      propertyId: id,
      propertyName: property?.name || "Unknown Property",
      reviewerName: user.displayName || "Anonymous",
      reviewerEmail: user.email,
      rating: Number(reviewForm.rating),
      comment: reviewForm.comment,
      createdAt: new Date().toISOString()
    };

    try {
      const res = await api.post("/ratings", payload);
      if (res.data.success || res.data._id) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Review submitted successfully!",
          confirmButtonColor: "#10b981",
          timer: 2000
        });
        setRatings([payload, ...ratings]);
        setReviewForm({ rating: 5, comment: "" });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.error || "Failed to submit review",
        confirmButtonColor: "#ef4444"
      });
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  
  if (!property) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--bg-secondary)] px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🏚️</div>
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-3">
            Property Not Found
          </h2>
          <p className="text-lg text-[var(--text-secondary)] mb-6">
            The property you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/all-properties")}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:scale-105 transition-transform shadow-lg"
          >
            Browse Properties
          </button>
        </div>
      </div>
    );
  }

  const averageRating = ratings.length > 0
    ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1)
    : 0;

  return (
    <div className="py-12 bg-[var(--bg-secondary)] min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-blue-600 transition mb-6"
        >
          <FiArrowLeft /> Back
        </button>

        {/* Property Image */}
        <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl mb-8">
          <img
            src={property.image || "https://via.placeholder.com/800x400"}
            alt={property.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-lg font-bold shadow-lg">
            {property.category}
          </div>
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 px-6 py-2 rounded-full text-lg font-bold shadow-lg">
            ৳ {property.price?.toLocaleString()}
          </div>
        </div>

        {/* Property Details */}
        <div className="bg-[var(--card-bg)] rounded-2xl shadow-lg p-8 border border-[var(--border-color)] mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-6">
            {property.name}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex items-center gap-3 text-[var(--text-secondary)]">
              <FiMapPin className="text-red-500 text-2xl" />
              <div>
                <p className="text-sm font-semibold">Location</p>
                <p className="text-lg text-[var(--text-primary)]">{property.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-[var(--text-secondary)]">
              <FiDollarSign className="text-green-500 text-2xl" />
              <div>
                <p className="text-sm font-semibold">Price</p>
                <p className="text-lg font-bold text-[var(--text-primary)]">৳ {property.price?.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-[var(--text-secondary)]">
              <FiUser className="text-blue-500 text-2xl" />
              <div>
                <p className="text-sm font-semibold">Posted By</p>
                <p className="text-lg text-[var(--text-primary)]">{property.userName || "Anonymous"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-[var(--text-secondary)]">
              <FiCalendar className="text-purple-500 text-2xl" />
              <div>
                <p className="text-sm font-semibold">Posted On</p>
                <p className="text-lg text-[var(--text-primary)]">
                  {property.createdAt ? format(new Date(property.createdAt), "MMM dd, yyyy") : "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-[var(--border-color)] pt-6">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">Description</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              {property.description || "No description available"}
            </p>
          </div>

          <div className="border-t border-[var(--border-color)] pt-6 mt-6">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">Contact Information</h2>
            <div className="flex items-center gap-2 text-[var(--text-secondary)]">
              <FiMail className="text-blue-500" />
              <a href={`mailto:${property.userEmail}`} className="hover:text-blue-600 transition">
                {property.userEmail}
              </a>
            </div>
          </div>
        </div>

        {/* Ratings & Reviews Section */}
        <div className="bg-[var(--card-bg)] rounded-2xl shadow-lg p-8 border border-[var(--border-color)]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-[var(--text-primary)]">Ratings & Reviews</h2>
            {ratings.length > 0 && (
              <div className="flex items-center gap-2">
                <FiStar className="text-yellow-400 fill-yellow-400 text-2xl" />
                <span className="text-2xl font-bold text-[var(--text-primary)]">{averageRating}</span>
                <span className="text-[var(--text-secondary)]">({ratings.length} reviews)</span>
              </div>
            )}
          </div>

          {/* Add Review Form */}
          <form onSubmit={handleSubmitReview} className="mb-8 bg-[var(--bg-secondary)] p-6 rounded-xl border border-[var(--border-color)]">
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Leave a Review</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
                Rating
              </label>
              <select
                name="rating"
                value={reviewForm.rating}
                onChange={handleChange}
                className="w-full md:w-40 px-4 py-2 border border-[var(--border-color)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {"⭐".repeat(n)} ({n} Star{n > 1 ? "s" : ""})
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
                Your Review
              </label>
              <textarea
                name="comment"
                value={reviewForm.comment}
                onChange={handleChange}
                placeholder="Share your experience with this property..."
                rows="4"
                className="w-full px-4 py-3 border border-[var(--border-color)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submittingReview}
              className={`px-6 py-3 rounded-lg text-white font-semibold transition ${
                submittingReview
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105"
              }`}
            >
              {submittingReview ? "Submitting..." : "Submit Review"}
            </button>
          </form>

          {/* Reviews List */}
          <div className="space-y-4">
            {ratings.length > 0 ? (
              ratings.map((review, idx) => (
                <ReviewCard key={review._id || idx} review={review} />
              ))
            ) : (
              <div className="text-center py-10">
                <div className="text-6xl mb-4">⭐</div>
                <p className="text-[var(--text-secondary)] text-lg">No reviews yet. Be the first to review!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
 }