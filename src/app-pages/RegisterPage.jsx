import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth-context/AuthProvider";
import Swal from "sweetalert2";

const RegisterPage = () => {
  const { register, loginWithGoogle } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const isValidPassword = (password) => {
    return /[A-Z]/.test(password) && /[a-z]/.test(password) && password.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidPassword(password)) {
      Swal.fire("Error", "Password must be at least 6 characters and include uppercase and lowercase letters.", "error");
      return;
    }

    try {
      await register(email, password, name, photoURL);
      Swal.fire("Success", "Account created successfully!", "success");
      navigate("/");
    } catch (err) {
      Swal.fire("Error", err.message || "Failed to register. Please try again.", "error");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      Swal.fire("Success", "Logged in with Google!", "success");
      navigate("/");
    } catch (err) {
      Swal.fire("Error", err.message || "Google Sign-in failed", "error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-600">
          Create Your HomeNest Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="text"
            placeholder="Photo URL (optional)"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            placeholder="Password (min 6 chars, upper & lower)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Register
          </button>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Continue with Google
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-green-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
