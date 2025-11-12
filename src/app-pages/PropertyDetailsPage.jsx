import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api-services/apiClient";
import { AuthContext } from "../auth-context/AuthProvider";
import Swal from "sweetalert2";
import ReviewCard from "../ui-components/ReviewCard";
import LoadingSpinner from "../ui-components/LoadingSpinner";

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [property, setProperty] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });

  // Fetch property details and ratings
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch property
        const resProperty = await api.get(`/properties/${id}`);
        setProperty(resProperty.data);

        // Fetch ratings
        const resRatings = await api.get(`/ratings?propertyId=${id}`);
        // Extract data safely; ensure it's always an array
        setRatings(resRatings.data?.data || []);
      } catch (err) {
        Swal.fire(
          "Error",
          err.response?.data?.error || "Failed to fetch data",
          "error"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Handle form input change
  const handleChange = (e) => {
    setReviewForm({ ...reviewForm, [e.target.name]: e.target.value });
  };

  // Submit review
  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!user) {
      Swal.fire("Login Required", "Please login to submit a review", "warning");
      return;
    }

    const payload = {
      propertyId: id,
      reviewerName: user.displayName || "Anonymous",
      reviewerEmail: user.email,
      rating: Number(reviewForm.rating),
      comment: reviewForm.comment,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await api.post("/ratings", payload);
      if (res.data.success) {
        Swal.fire("Success", "Review submitted!", "success");
        setRatings([payload, ...ratings]); // update UI immediately
        setReviewForm({ rating: 5, comment: "" });
      }
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.error || "Failed to submit review",
        "error"
      );
    }
  };

  if (loading) return <LoadingSpinner />; // spinner instead of text
  if (!property)
    return <p className="text-center py-10">Property not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Property Info */}
      <img
        src={property.image || "/placeholder.png"}
        alt={property.name}
        className="w-full h-64 object-cover rounded"
      />
      <h2 className="text-2xl font-bold mt-4">{property.name}</h2>
      <p className="text-sm text-gray-500">{property.category}</p>
      <p className="mt-1 font-semibold">{property.price} BDT</p>
      <p className="text-gray-700 mt-2">{property.description}</p>
      <p className="text-sm text-gray-500 mt-1">{property.location}</p>
      <p className="text-sm text-gray-400">
        Posted by: {property.userName} ({property.userEmail})
      </p>

      {/* Ratings & Reviews */}
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-2">Ratings & Reviews</h3>

        {/* Add Review Form */}
        <form onSubmit={handleSubmitReview} className="mb-4 space-y-2">
          <select
            name="rating"
            value={reviewForm.rating}
            onChange={handleChange}
            className="select select-bordered w-24"
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} Star
              </option>
            ))}
          </select>
          <textarea
            name="comment"
            value={reviewForm.comment}
            onChange={handleChange}
            placeholder="Write your review..."
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
          <button type="submit" className="btn btn-primary btn-sm">
            Submit Review
          </button>
        </form>

        {/* Reviews List */}
        <div className="space-y-3">
          {Array.isArray(ratings) && ratings.length > 0 ? (
            ratings.map((r, idx) => (
              <ReviewCard key={r._id || idx} review={r} />
            ))
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
