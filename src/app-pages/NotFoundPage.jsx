// src/app-pages/NotFoundPage.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiHome, FiArrowLeft } from "react-icons/fi";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white px-4">
      {/* 404 Animation */}
      <div className="text-center">
        <h1 className="text-9xl md:text-[200px] font-bold mb-4 animate-bounce">
          404
        </h1>
        
        <div className="mb-8">
          <div className="text-6xl mb-4">🏚️</div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-md mx-auto opacity-90">
            The property you're looking for seems to have been sold or doesn't exist anymore.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:scale-110 transition-transform shadow-2xl"
          >
            <FiArrowLeft /> Go Back
          </button>
          
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition shadow-2xl"
          >
            <FiHome /> Go to Home
          </Link>
        </div>

        {/* Fun Message */}
        <p className="mt-12 text-sm opacity-75 italic">
          "Even the best real estate agents can't find this page!" 🏡
        </p>
      </div>

      {/* Floating Decorations */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full animate-bounce"></div>
      <div className="absolute top-1/2 left-5 w-16 h-16 bg-white/15 rounded-full animate-ping"></div>
    </div>
  );
};

 export default NotFoundPage;