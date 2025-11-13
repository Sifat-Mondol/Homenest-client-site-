// src/app-pages/RegisterPage.jsx
import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../auth-context/AuthProvider";
import Swal from "sweetalert2";
import { FiUser, FiMail, FiLock, FiImage, FiEye, FiEyeOff, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

const RegisterPage = () => {
  const { register, loginWithGoogle } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // Password validation checks
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasMinLength = password.length >= 6;
  const isValidPassword = hasUpperCase && hasLowerCase && hasMinLength;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!isValidPassword) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        html: `
          <div class="text-left">
            <p class="mb-2">Password must meet the following requirements:</p>
            <ul class="list-disc list-inside space-y-1">
              <li class="${hasUpperCase ? 'text-green-600' : 'text-red-600'}">At least one uppercase letter</li>
              <li class="${hasLowerCase ? 'text-green-600' : 'text-red-600'}">At least one lowercase letter</li>
              <li class="${hasMinLength ? 'text-green-600' : 'text-red-600'}">Minimum 6 characters</li>
            </ul>
          </div>
        `,
        confirmButtonColor: "#ef4444"
      });
      return;
    }

    setIsLoading(true);

    try {
      await register(email, password, name, photoURL);
      Swal.fire({
        icon: "success",
        title: "Welcome to HomeNest!",
        text: "Your account has been created successfully",
        confirmButtonColor: "#10b981",
        timer: 2000
      });
      navigate(from, { replace: true });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.message || "Failed to create account. Please try again.",
        confirmButtonColor: "#ef4444"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
      Swal.fire({
        icon: "success",
        title: "Welcome!",
        text: "Signed in with Google successfully",
        confirmButtonColor: "#10b981",
        timer: 2000
      });
      navigate(from, { replace: true });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Google Sign-in Failed",
        text: err.message || "Please try again",
        confirmButtonColor: "#ef4444"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-600 via-teal-600 to-blue-600 px-4 py-12">
      <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-3xl shadow-2xl w-full max-w-md">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
            Join HomeNest
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Create your account to start listing properties
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Full Name
            </label>
            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
            </div>
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Photo URL <span className="text-gray-400 text-xs">(Optional)</span>
            </label>
            <div className="relative">
              <FiImage className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="url"
                placeholder="https://example.com/photo.jpg"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-12 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {password && (
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  {hasUpperCase ? (
                    <FiCheckCircle className="text-green-500" />
                  ) : (
                    <FiXCircle className="text-red-500" />
                  )}
                  <span className={hasUpperCase ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                    One uppercase letter
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {hasLowerCase ? (
                    <FiCheckCircle className="text-green-500" />
                  ) : (
                    <FiXCircle className="text-red-500" />
                  )}
                  <span className={hasLowerCase ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                    One lowercase letter
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {hasMinLength ? (
                    <FiCheckCircle className="text-green-500" />
                  ) : (
                    <FiXCircle className="text-red-500" />
                  )}
                  <span className={hasMinLength ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                    At least 6 characters
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-xl text-white font-bold text-lg transition-all shadow-lg ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-green-600 to-teal-600 hover:scale-105 btn-animate"
            }`}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
          <span className="px-4 text-sm text-gray-500 dark:text-gray-400">OR</span>
          <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
        </div>

        {/* Google Sign Up */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className={`w-full flex items-center justify-center gap-3 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl font-semibold transition-all ${
            isLoading
              ? "bg-gray-100 cursor-not-allowed"
              : "bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          }`}
        >
          <FcGoogle className="text-2xl" />
          <span className="text-gray-700 dark:text-gray-300">
            {isLoading ? "Please wait..." : "Sign up with Google"}
          </span>
        </button>

        {/* Login Link */}
        <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-600 dark:text-green-400 hover:underline font-semibold"
          >
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
};

 export default RegisterPage;