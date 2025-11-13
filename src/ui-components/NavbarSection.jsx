import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../auth-context/AuthProvider";
import { 
  FiSun, 
  FiMoon, 
  FiMenu, 
  FiX, 
  FiHome, 
  FiGrid, 
  FiPlusCircle, 
  FiList, 
  FiStar 
} from "react-icons/fi";

const NavbarSection = ({ darkMode, toggleDarkMode }) => {
  const { user, loading, logOut } = useContext(AuthContext); // ✅ Added logOut here
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleLogout = async () => {
    try {
      await logOut(); // ✅ Works now
      setDropdownOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Auto-hide navbar on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  if (loading) {
    return (
      <nav className="bg-[var(--card-bg)] shadow-lg sticky top-0 z-50 transition-all duration-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link 
            to="/" 
            className="text-2xl md:text-3xl font-bold gradient-text flex items-center gap-2"
          >
            <FiHome className="text-blue-600" />
            HomeNest
          </Link>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav 
      className={`bg-[var(--card-bg)] shadow-lg fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="text-2xl md:text-3xl font-bold gradient-text flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <FiHome className="text-blue-600" />
          HomeNest
        </Link>

        <div className="hidden lg:flex items-center space-x-6">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `flex items-center gap-2 hover:text-blue-500 transition ${isActive ? 'text-blue-600 font-semibold' : ''}`
            }
          >
            <FiHome /> Home
          </NavLink>
          
          <NavLink 
            to="/all-properties" 
            className={({ isActive }) => 
              `flex items-center gap-2 hover:text-blue-500 transition ${isActive ? 'text-blue-600 font-semibold' : ''}`
            }
          >
            <FiGrid /> All Properties
          </NavLink>

          {user && (
            <>
              <NavLink 
                to="/add-property" 
                className={({ isActive }) => 
                  `flex items-center gap-2 hover:text-green-500 transition ${isActive ? 'text-green-600 font-semibold' : ''}`
                }
              >
                <FiPlusCircle /> Add Property
              </NavLink>
              
              <NavLink 
                to="/my-properties" 
                className={({ isActive }) => 
                  `flex items-center gap-2 hover:text-purple-500 transition ${isActive ? 'text-purple-600 font-semibold' : ''}`
                }
              >
                <FiList /> My Properties
              </NavLink>
              
              <NavLink 
                to="/my-ratings" 
                className={({ isActive }) => 
                  `flex items-center gap-2 hover:text-yellow-500 transition ${isActive ? 'text-yellow-600 font-semibold' : ''}`
                }
              >
                <FiStar /> My Ratings
              </NavLink>
            </>
          )}

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-[var(--bg-secondary)] hover:scale-110 transition-transform"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? (
              <FiSun className="text-yellow-400 text-xl" />
            ) : (
              <FiMoon className="text-gray-700 text-xl" />
            )}
          </button>

          {!user ? (
            <div className="flex items-center gap-3">
              <NavLink 
                to="/login" 
                className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition btn-animate"
              >
                Login
              </NavLink>
              <NavLink 
                to="/register" 
                className="px-5 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition btn-animate"
              >
                Signup
              </NavLink>
            </div>
          ) : (
            <div className="relative">
              <img
                src={user.photoURL || "https://via.placeholder.com/150"}
                alt="User Avatar"
                onClick={toggleDropdown}
                className="w-12 h-12 rounded-full cursor-pointer border-4 border-blue-500 hover:scale-110 transition-transform shadow-lg"
              />
              
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-[var(--card-bg)] shadow-2xl rounded-xl py-3 z-50 border border-[var(--border-color)] fade-in">
                  <div className="px-4 py-2 border-b border-[var(--border-color)]">
                    <p className="font-bold text-lg">{user.displayName || "User"}</p>
                    <p className="text-sm text-[var(--text-secondary)] truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition font-semibold"
                  >
                    🚪 Log out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <button
          onClick={toggleMobileMenu}
          className="lg:hidden text-2xl p-2 hover:bg-[var(--bg-secondary)] rounded-md transition"
        >
          {mobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-[var(--card-bg)] border-t border-[var(--border-color)] fade-in">
          <div className="flex flex-col space-y-3 px-4 py-4">
            <NavLink to="/" onClick={toggleMobileMenu} className="flex items-center gap-2 hover:text-blue-500 transition">
              <FiHome /> Home
            </NavLink>
            <NavLink to="/all-properties" onClick={toggleMobileMenu} className="flex items-center gap-2 hover:text-blue-500 transition">
              <FiGrid /> All Properties
            </NavLink>

            {user && (
              <>
                <NavLink to="/add-property" onClick={toggleMobileMenu} className="flex items-center gap-2 hover:text-green-500 transition">
                  <FiPlusCircle /> Add Property
                </NavLink>
                <NavLink to="/my-properties" onClick={toggleMobileMenu} className="flex items-center gap-2 hover:text-purple-500 transition">
                  <FiList /> My Properties
                </NavLink>
                <NavLink to="/my-ratings" onClick={toggleMobileMenu} className="flex items-center gap-2 hover:text-yellow-500 transition">
                  <FiStar /> My Ratings
                </NavLink>
              </>
            )}

            <button
              onClick={toggleDarkMode}
              className="flex items-center gap-2 p-2 bg-[var(--bg-secondary)] rounded-md hover:scale-105 transition"
            >
              {darkMode ? <><FiSun /> Light Mode</> : <><FiMoon /> Dark Mode</>}
            </button>

            {!user ? (
              <div className="flex flex-col gap-2">
                <NavLink to="/login" onClick={toggleMobileMenu} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700 transition">
                  Login
                </NavLink>
                <NavLink to="/register" onClick={toggleMobileMenu} className="px-4 py-2 bg-green-600 text-white rounded-lg text-center hover:bg-green-700 transition">
                  Signup
                </NavLink>
              </div>
            ) : (
              <div className="border-t border-[var(--border-color)] pt-3">
                <p className="font-semibold">{user.displayName || "User"}</p>
                <p className="text-sm text-[var(--text-secondary)]">{user.email}</p>
                <button onClick={handleLogout} className="mt-2 w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

 export default NavbarSection;
