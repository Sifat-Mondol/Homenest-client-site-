import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth-context/AuthProvider";

export default function MyRatingsPage() {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/ratings?reviewerEmail=${user.email}`)
        .then((res) => res.json())
        .then((data) => setReviews(data));
    }
  }, [user]);

  if (!user) {
    return <p className="text-center mt-10 text-gray-600">Please log in to view your ratings.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Ratings</h2>
      {reviews.length > 0 ? (
        reviews.map((r) => (
          <div key={r._id} className="border rounded p-3 mb-3">
            <p className="font-semibold">{r.propertyName}</p>
            <p>Rating: {r.rating} / 5</p>
            <p className="text-gray-600">{r.comment}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500 mt-6">No reviews added yet.</p>
      )}
    </div>
  );
}
