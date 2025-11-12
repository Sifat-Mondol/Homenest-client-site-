import React from "react";

const ReviewCard = ({ review }) => {
  return (
    <div className="border rounded-md p-4 shadow-sm mb-4">
      <p className="font-semibold">{review.reviewerName}</p>
      <p>Property: {review.propertyName}</p>
      <p>Rating: {review.rating} / 5</p>
      <p className="mt-1 text-gray-700">{review.comment}</p>
      <p className="text-sm text-gray-400 mt-1">{new Date(review.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default ReviewCard;
