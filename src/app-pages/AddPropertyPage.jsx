import React, { useContext, useState } from "react"; 
import { AuthContext } from "../auth-context/AuthProvider";
import Swal from "sweetalert2";
import api from "../api-services/apiClient"; // axios instance

export default function AddPropertyPage() {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Rent",
    price: "",
    location: "",
    image: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      Swal.fire("Unauthorized", "You must be logged in to add a property", "error");
      return;
    }

    const payload = {
      ...formData,
      userEmail: user.email,
      userName: user.displayName || "Anonymous",
    };

    try {
      const res = await api.post("/properties", payload);
      if (res.data.success) {
        Swal.fire("Success!", "Property added successfully ✅", "success");
        setFormData({
          name: "",
          description: "",
          category: "Rent",
          price: "",
          location: "",
          image: ""
        });
      } else {
        Swal.fire("Error", "Failed to add property ❌", "error");
      }
    } catch (err) {
      Swal.fire("Error", err.response?.data?.error || "Something went wrong", "error");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add New Property</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Property Name"
          className="input input-bordered w-full"
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="select select-bordered w-full"
          required
        >
          <option>Rent</option>
          <option>Sale</option>
          <option>Commercial</option>
          <option>Land</option>
        </select>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="input input-bordered w-full"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          required
        />
        <button type="submit" className="btn btn-primary w-full">
          Add Property
        </button>
      </form>
    </div>
  );
}
