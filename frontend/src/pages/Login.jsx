import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // clear old errors

    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      // Save token in localStorage
      localStorage.setItem("token", res.data.token);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    }
  };

  return (
    // Main container with a dark background
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      {/* Gradient border wrapper */}
      <div className="relative rounded-xl bg-gradient-to-br from-sky-500 via-purple-500 to-rose-500 p-1 w-full max-w-md">
        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="z-10 bg-slate-800 p-8 rounded-lg shadow-2xl space-y-6"
        >
          <h2 className="text-3xl font-bold text-center text-gray-100">
            Welcome Back
          </h2>

          {/* Error message display */}
          {error && (
            <p className="text-red-400 text-center bg-red-500/10 p-2 rounded-lg text-sm">
              {error}
            </p>
          )}

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-sky-500 to-purple-600 hover:from-sky-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-[1.03] active:scale-95 shadow-lg"
          >
            Login
          </button>

          {/* Link to Register */}
          <p className="text-center text-gray-400 text-sm mt-4">
            Don’t have an account?{" "}
            <Link
              to="/"
              className="text-sky-400 hover:underline hover:text-sky-300"
            >
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
