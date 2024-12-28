
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const CustomerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ email: "", password: "" });

  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset error messages
    setError({ email: "", password: "" });

    // Basic form validation
    if (!email || !password) {
      setError({
        email: !email ? "Email is required" : "",
        password: !password ? "Password is required" : "",
      });
      return;
    }

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
  
  const handleSignInClick = () => {
    navigate('/chat');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-open-sans">
      <div className="p-8 rounded-xl shadow-lg w-full max-w-md" style={{ backgroundColor: 'rgba(152, 211, 191, 0.4)' }}>
        <h1 className="text-2xl font-medium text-center text-black mb-6">Sign In your Account</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-black text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              className={`w-full py-2 border ${error.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-white`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
          </div>

          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-black text-sm font-medium mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className={`w-full py-2 border ${error.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-white`}
             
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* <button
              type="button"
              className="absolute right-4 top-2 text-gray-400 hover:text-gray-200"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
            </button> */}
            {error.password && <p className="text-red-500 text-sm">{error.password}</p>}
          </div>

          <button
            type="submit"
            className={`w-full bg-[#80CBB2] py-2 rounded-lg text-white font-semibold hover:bg-[#90c9b8] focus:outline-none focus:ring focus:ring-red-600 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Sign In"}
            
          </button>
        </form>

        <div className="flex items-center text-xs justify-center mt-4">
          <hr className="border-t border-dashed border-gray-500 w-1/2 mr-2" />
          <span className="text-gray-500 ">OR</span>
          <hr className="border-t border-dashed border-gray-500 w-1/2 ml-2" />
        </div>


        <div className="mt-4">
          <button className="w-full text-sm bg-white py-2 rounded-3xl text-black font-semibold focus:outline-none focus:ring"
          style={{ border: "1px solid #80CBB2" }}>
            Sign In with a Code
          </button>
        </div>

        <div className="mt-4 text-center">
          <a href="#" className="text-gray-500 hover:text-gray-400 text-xs">
            Forgot Password?
          </a>
        </div>

        <div className="mt-4">
          <label className="inline-flex items-center text-xs">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4"
            />
            <span className="ml-2 text-gray-500 ">Remember Me</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;
