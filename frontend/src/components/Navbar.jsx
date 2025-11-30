import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token");
    // Redirect to the login page
    navigate("/login");
  };

  return (
    <nav className="bg-gray-950 px-4 py-6 shadow-lg border-b-2 border-gray-800">
      <div className="container mx-auto flex justify-between items-center">
        {/* App Title/Logo with bigger font */}
        <Link
          to="/dashboard"
          className="text-3xl font-bold text-white tracking-wider hover:text-purple-300 transition-colors duration-300"
        >
          HostelMart
        </Link>

        {/* Styled Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-red-600 to-orange-500 text-white font-semibold px-6 py-2 rounded-lg text-lg hover:from-red-700 hover:to-orange-600 transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
