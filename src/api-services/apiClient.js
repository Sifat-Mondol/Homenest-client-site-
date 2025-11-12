// src/api-services/apiClient.js
import axios from "axios";
import Swal from "sweetalert2";

// Base API URL from Vite env
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to every request if exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Global response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      Swal.fire("Error", "Network error. Please check your connection.", "error");
    } else if (error.response.data?.error) {
      Swal.fire("Error", error.response.data.error, "error");
    } else {
      Swal.fire("Error", "Something went wrong.", "error");
    }
    return Promise.reject(error);
  }
);

// === Custom API methods for convenience ===
const propertiesAPI = {
  getAll: (search = "", sort = "newest", page = 1, limit = 0) =>
    api.get(`/properties`, { params: { search, sortBy: sort, page, limit } }),

  getFeatured: () => api.get("/properties/featured"),

  getById: (id) => api.get(`/properties/${id}`),

  create: (propertyData) => api.post("/properties", propertyData),

  update: (id, propertyData) => api.put(`/properties/${id}`, propertyData),

  delete: (id) => api.delete(`/properties/${id}`),

  getByUserEmail: (email) => api.get(`/properties/by-user/${email}`),
};

const ratingsAPI = {
  getByPropertyId: (propertyId) => api.get(`/ratings`, { params: { propertyId } }),

  create: (ratingData) => api.post("/ratings", ratingData),

  delete: (id) => api.delete(`/ratings/${id}`),
};

export { propertiesAPI, ratingsAPI };
export default api;
