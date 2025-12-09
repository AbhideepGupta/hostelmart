import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PostForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("image", formData.image);

      const res = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const response = await res.json();

      if (res.ok) {
        setMessage("✅ Post created successfully!");
        setTimeout(() => navigate("/posts"), 1500);
      } else {
        setMessage("❌ " + response.message);
      }
    } catch (error) {
      setMessage("❌ Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="rounded-xl bg-gradient-to-br from-sky-500 via-purple-500 to-rose-500 p-1 w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-slate-800 p-8 rounded-lg shadow-2xl space-y-6"
        >
          <h2 className="text-2xl font-bold text-center text-white">
            Create a Post
          </h2>

          <input
            type="text"
            name="title"
            placeholder="Item Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
            rows="3"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price (₹)"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
            required
          />

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full bg-slate-700 text-white p-3 rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-sky-500 to-purple-600 text-white py-3 rounded-lg"
          >
            Post Item
          </button>

          {message && (
            <p className="text-center text-sm mt-3 text-green-400">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default PostForm;
