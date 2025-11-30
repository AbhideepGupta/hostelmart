import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get(
          "http://localhost:5000/api/users/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(res.data);
      } catch (err) {
        setError("Session expired or unauthorized");
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Color gap */}
      <div className="h-4 bg-gray-800"></div>

      {/* Center Content */}
      <div className="flex flex-col items-center justify-center mt-16 px-4">
        {/* Personalized Welcome Heading */}
        {user && (
          <h1 className="text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 tracking-tight text-center">
            Welcome !
          </h1>
        )}

        {error && <p className="text-red-400 mb-4">{error}</p>}

        {user ? (
          <div className="text-center bg-gray-800 p-10 rounded-xl shadow-2xl max-w-lg w-full">
            {/* Redundant welcome message removed from here */}
            <p className="text-gray-400 mb-6 text-md">{user.email}</p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => navigate("/create-post")}
                className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-900 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
              >
                ➕ Create New Post
              </button>

              <button
                onClick={() => navigate("/posts")}
                className="bg-gradient-to-r from-green-600 to-green-800 text-white px-8 py-4 rounded-xl hover:from-green-700 hover:to-green-900 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
              >
                📋 View All Posts
              </button>
            </div>
          </div>
        ) : (
          !error && (
            <p className="text-gray-300 text-xl">Loading user data...</p>
          )
        )}
      </div>
    </div>
  );
};

export default Dashboard;
