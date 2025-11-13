// src/ui-components/FooterSection.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FiFacebook, FiTwitter, FiLinkedin, FiInstagram, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

const FooterSection = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          <div className="space-y-4">
            <h2 className="text-3xl font-bold gradient-text">HomeNest</h2>
            <p className="text-gray-300 leading-relaxed">
              Your trusted real estate portal to find, post, and manage properties effortlessly. 
              Discover your dream home with HomeNest today!
            </p>
            <div className="flex space-x-4 text-2xl">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-blue-500 transition transform hover:scale-110"
                aria-label="Facebook"
              >
                <FiFacebook />
              </a>
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-gray-400 transition transform hover:scale-110"
                aria-label="X (Twitter)"
              >
                <FaXTwitter />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-blue-400 transition transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <FiLinkedin />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-pink-500 transition transform hover:scale-110"
                aria-label="Instagram"
              >
                <FiInstagram />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 border-b-2 border-blue-500 inline-block pb-1">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white hover:pl-2 transition-all">
                  🏠 Home
                </Link>
              </li>
              <li>
                <Link to="/all-properties" className="text-gray-300 hover:text-white hover:pl-2 transition-all">
                  🏘️ All Properties
                </Link>
              </li>
              <li>
                <Link to="/add-property" className="text-gray-300 hover:text-white hover:pl-2 transition-all">
                  ➕ Add Property
                </Link>
              </li>
              <li>
                <Link to="/my-properties" className="text-gray-300 hover:text-white hover:pl-2 transition-all">
                  📋 My Properties
                </Link>
              </li>
              <li>
                <Link to="/my-ratings" className="text-gray-300 hover:text-white hover:pl-2 transition-all">
                  ⭐ My Ratings
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 border-b-2 border-green-500 inline-block pb-1">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-300">
                <FiMail className="text-green-400" />
                <a href="mailto:support@homenest.com" className="hover:text-white transition">
                  support@homenest.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <FiPhone className="text-blue-400" />
                <a href="tel:+8801234567890" className="hover:text-white transition">
                  +880 123 456 789
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <FiMapPin className="text-red-400" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 border-b-2 border-yellow-500 inline-block pb-1">
              Legal & More
            </h3>
            <ul className="space-y-2 mb-4">
              <li>
                <a href="#" className="text-gray-300 hover:text-white hover:pl-2 transition-all">
                  📜 Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white hover:pl-2 transition-all">
                  🔒 Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white hover:pl-2 transition-all">
                  ❓ FAQ
                </a>
              </li>
            </ul>

            <div className="mt-4">
              <p className="text-sm text-gray-300 mb-2">Subscribe to our newsletter:</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 rounded-l-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                />
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-lg transition font-semibold">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 mt-6 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} <span className="font-semibold text-white">HomeNest</span>. 
            All rights reserved. Made with ❤️ for real estate enthusiasts.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Designed & Developed with passion | Powered by React & Firebase
          </p>
        </div>
       </div>
     </footer>
  );
 };

 export default FooterSection;