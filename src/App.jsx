// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./auth-context/AuthProvider";

// Layout Components
import NavbarSection from "./ui-components/NavbarSection";
import FooterSection from "./ui-components/FooterSection";
import PrivateGuard from "./ui-components/PrivateGuard";

// Pages
import HomePage from "./app-pages/HomePage";
import AllPropertiesPage from "./app-pages/AllPropertiesPage";
import AddPropertyPage from "./app-pages/AddPropertyPage";
import MyPropertiesPage from "./app-pages/MyPropertiesPage";
import MyRatingsPage from "./app-pages/MyRatingsPage";
import PropertyDetailsPage from "./app-pages/PropertyDetailsPage";
import UpdatePropertyPage from "./app-pages/UpdatePropertyPage";
import NotFoundPage from "./app-pages/NotFoundPage";
import LoginPage from "./app-pages/LoginPage";
import RegisterPage from "./app-pages/RegisterPage";

// Layout wrapper to conditionally show navbar/footer
const Layout = ({ darkMode, toggleDarkMode, children }) => {
  const location = useLocation();
  const is404Page = location.pathname === "*" || !['/', '/all-properties', '/add-property', '/my-properties', '/my-ratings', '/update-property', '/property-details', '/login', '/register'].some(path => location.pathname.startsWith(path.replace(':id', '')));

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
      {/* Show Navbar on all pages except 404 */}
      {!is404Page && <NavbarSection darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
      
      {/* Add padding-top only if navbar is shown */}
      <main className={`flex-grow ${!is404Page ? 'pt-20' : ''}`}>
        {children}
      </main>

      {/* Show Footer on all pages except 404 */}
      {!is404Page && <FooterSection />}
    </div>
  );
};

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <AuthProvider>
      <Router>
        <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/all-properties" element={<AllPropertiesPage />} />
            
            <Route
              path="/add-property"
              element={
                <PrivateGuard>
                  <AddPropertyPage />
                </PrivateGuard>
              }
            />
            
            <Route
              path="/my-properties"
              element={
                <PrivateGuard>
                  <MyPropertiesPage />
                </PrivateGuard>
              }
            />
            
            <Route
              path="/my-ratings"
              element={
                <PrivateGuard>
                  <MyRatingsPage />
                </PrivateGuard>
              }
            />
            
            <Route
              path="/update-property/:id"
              element={
                <PrivateGuard>
                  <UpdatePropertyPage />
                </PrivateGuard>
              }
            />
            
            <Route
              path="/property-details/:id"
              element={
                <PrivateGuard>
                  <PropertyDetailsPage />
                </PrivateGuard>
              }
            />

            {/* Authentication */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* 404 - No Navbar/Footer */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

 export default App;