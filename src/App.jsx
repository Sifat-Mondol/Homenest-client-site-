import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <NavbarSection />

          <main className="flex-grow">
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

              {/* 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          <FooterSection />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
