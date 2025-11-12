import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.css"; // Tailwind + base styles
import "./App.css";    // Your custom styles

import { AuthProvider } from "./auth-context/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
