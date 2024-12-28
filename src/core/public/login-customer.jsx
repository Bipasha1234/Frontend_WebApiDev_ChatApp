import axios from "axios";
import React, { useState } from "react";

const CustomerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      // Send login request to backend
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });

      // Store the token (for example, in localStorage)
      localStorage.setItem("token", response.data.token);

      alert("Login successful!");
      // Optionally, redirect the user after successful login
      // window.location.href = "/dashboard"; // For example, redirect to dashboard
    } catch (error) {
      console.error("Error during login:", error.response?.data || error.message);
      alert(error.response?.data?.message || "An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="bg-black text-white p-8 rounded-md w-96">
        <h1 className="text-center text-2xl font-bold mb-6 text-red-600">NETFLIX</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email or phone number"
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-red-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-red-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-4 top-2 text-gray-400 hover:text-gray-200"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "HIDE" : "SHOW"}
            </button>
          </div>
          <button
            type="submit"
            className={`w-full bg-red-600 py-2 rounded-md text-white font-semibold hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-600 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Sign In"}
          </button>
        </form>
        <div className="flex items-center justify-center mt-4">
          <span className="text-gray-400">OR</span>
        </div>
        <div className="mt-4">
          <button
            className="w-full bg-gray-700 py-2 rounded-md text-white font-semibold hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-600"
          >
            Use a Sign-In Code
          </button>
        </div>
        <div className="mt-4 text-center">
          <a
            href="#"
            className="text-gray-400 hover:text-gray-200 text-sm"
          >
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;
